import { PrismaClient, Product } from '@prisma/client';
import {
  ClientRequest,
  cookieProps,
  loginFailedErr,
  OrderRequest,
  paramMissingError,
  pwdSaltRounds,
  SignupRequest,
  userNotFound
} from '@servershared/constants';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from '@servershared/jwtService';
import { IProduct, OrderPayload } from '@shared/types';
import { ensure } from '@shared/utils';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import StatusCodes, { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { LoginRequest } from '../shared/constants';
import { loadStripe } from '@stripe/stripe-js';
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
  order: OrderPayload;
  products: Product[];
}) => {
  const stockCheck: number[] = [];
  order.products.forEach(item => {
    const product = ensure(
      products.find(product => product.id === item.product.id)
    );
    if (item.amount > product.stock) {
      stockCheck.push(product.id);
    }
  });
  return stockCheck;
};

export const submitOrder = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: OrderRequest, res: Response) => {
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
    if (productsNotInStock?.length) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Some products are not in stock.');
    }

    const totalAmount = products.reduce((acc, current) => {
      return acc + current.price / 10;
    }, 0);

    const order = await prisma.order.create({
      data: {
        cost: totalAmount,
        buyer: {
          connect: {
            id: req?.user?.id
          }
        },
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
        products: true,
        buyer: true
      }
    });

    const description = `Payment for ${products.length} ${
      products.length === 1 ? 'product' : 'producs'
    }.`;

    // Stripe metadata doesn't take arrays, only key value pairs such as strings.
    // This is a hacky way of getting several IDs in a string.
    // This has to be trimmed and split whenever it needs to be called.
    const idString = order.products.reduce((string, product) => {
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
      await prisma.order.delete({ where: { id: order.id } });
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Payment was unsuccessful, please try again.');
    }

    res.json({
      status: 'succeeded',
      message: 'Payment successeful.'
    });
  }
);
