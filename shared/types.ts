import { Product } from '@prisma/client';
import { Token } from '@stripe/stripe-js';

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
export interface CartProduct {
  product: Product;
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
