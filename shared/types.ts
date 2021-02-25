import { Category, Product } from '@prisma/client';
import { Token } from '@stripe/stripe-js';
import { Response } from 'express';

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}
export interface IUser {
  id: number;
  email: string;
  name: string;
  role?: string;
}

export interface IProduct extends Product {
  categories: Category[];
}
export interface CartProduct {
  product: IProduct;
  amount: number;
}

export interface OrderPayload {
  products: CartProduct[];
  cardToken: Token;
}

export const ensure = <T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};

export interface OrderResPayload {
  status: 'succeeded' | 'failed';
  message: string;
  orderId: number;
}

type Send<T = Response> = (body?: OrderResPayload) => T;
export interface OrderResponse extends Response {
  json: Send<this>;
}
