import { PrismaClient, Product } from '@prisma/client';
import { OrderRequest } from '@servershared/constants';
import { SubmitOrderPayload } from '@shared/types';
import { ensure } from '@shared/utils';
import { Router, Response } from 'express';
import asyncHandler from 'express-async-handler';
import StatusCodes from 'http-status-codes';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
  maxNetworkRetries: 1,
  timeout: 1000,
  host: 'api.stripe.com'
});

const router = Router();

const checkStock = ({
  order,
  products
}: {
  order: SubmitOrderPayload;
  products: Product[];
}) => {
  const productsNotInStock: number[] = [];
  order.products.forEach(item => {
    const product = ensure(
      products.find(product => product.id === item.product.id)
    );
    if (item.amount > product.stock) {
      productsNotInStock.push(product.id);
    }
  });
  return productsNotInStock;
};

export const submitOrder = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: OrderRequest, res: Response) => {
    if (!req.user) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error(
        'Not authorized to order. Something went wrong with authentication.'
      );
    }
    // Verify products to database
    const products = await Promise.all(
      req.body.products.map(async item => {
        const dbProduct = await prisma.product.findUnique({
          where: { id: item.product.id }
        });
        if (dbProduct === null) {
          res.status(StatusCodes.NOT_FOUND);
          throw new Error(
            `There was an error with the product "${item.product.title}".
             Please refresh or try again.`
          );
        } else return dbProduct;
      })
    );

    // Verify if stock is available

    const productsNotInStock = checkStock({ order: req.body, products });

    if (productsNotInStock?.length > 0) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Some products are not in stock.');
    }

    const totalAmount = products.reduce((acc, current) => {
      return acc + current.price; // Prices in DB are Int, so do not divide by 100
    }, 0);

    const orderWithProducts = await prisma.order.create({
      data: {
        cost: totalAmount, // This is an int, so 53,45 is 5345
        userId: req.user.id,
        products: {
          create: products.map(product => ({
            product: {
              connect: {
                id: product.id
              }
            },
            amount: ensure(
              req.body.products.find(item => item.product.id === product.id)
            ).amount
          }))
        }
      },
      include: {
        products: true
      }
    });

    const description = `Payment for ${products.length} ${
      products.length === 1 ? 'product' : 'producs'
    }.`;

    // Stripe metadata doesn't take arrays, only key value pairs such as strings.
    // This is a hacky way of getting several IDs in a string.
    // This has to be trimmed and split whenever it needs to be called.
    const idString = orderWithProducts.products.reduce((string, product) => {
      return string.toString() + product.productId.toString() + ' ';
    }, '');

    const charge = await stripe.charges.create({
      amount: totalAmount,
      currency: 'eur',
      source: req.body.cardToken.id,
      description: description,
      metadata: {
        product_id_string: idString
      }
    });

    if (charge.status === 'failed') {
      await prisma.order.delete({ where: { id: orderWithProducts.id } });
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Payment was unsuccessful, please try again.');
    }

    res.json(orderWithProducts);
  }
);

export const fetchOrder = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: OrderRequest, res: Response) => {
    if (!req.user) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('Not authorized to fetch order.');
    }
    // Verify products to database
    const order = await prisma.order.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        products: { include: { product: true } }
      }
    });
    if (!order) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Order not found.');
    }
    res.json(order);
  }
);
