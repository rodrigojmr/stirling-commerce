import { Category, Order, Product, ProductInOrder } from '@prisma/client';
import { Token } from '@stripe/stripe-js';
import { Response } from 'express';

export interface SignupParams {
  name: string;
  email: string;
  password: string;
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
export interface SubmitOrderPayload {
  products: CartProduct[];
  cardToken: Token;
}

export type SingleOrderPayload = Order & {
  products: (ProductInOrder & {
    product: Product;
  })[];
};

export type OrderPayload = Order & {
  products: ProductInOrder[];
};

// How to make "this", (the response function) take whatever
// Payload type I pass to make sure it's sending the right payload
