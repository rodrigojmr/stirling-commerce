import { PrismaClient } from '@prisma/client';
// import UserDao from '@daos/User/UserDao.mock';
import { JWTClass } from '@servershared/jwtService';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import StatusCodes from 'http-status-codes';

const prisma = new PrismaClient();

const router = Router();
// const userDao = new UserDao();
const JWTService = new JWTClass();
const { BAD_REQUEST, OK, UNAUTHORIZED, NOT_FOUND } = StatusCodes;

export const fetchAllProducts = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const allProducts = await prisma.product.findMany({
      include: {
        categories: true
      }
    });

    if (!allProducts || allProducts.length === 0) {
      res.status(NOT_FOUND);
      throw new Error('No products found.');
    }
    const products = allProducts.map(product => {
      const { ...restOfProduct } = product;
      return restOfProduct;
    });
    res.json(products);
  }
);

export const fetchProduct = asyncHandler(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        categories: true
      }
    });
    if (!product) {
      res.status(NOT_FOUND);
      throw new Error('Product not found.');
    }
    res.json(product);
  }
);
