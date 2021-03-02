import { CartProduct, IProduct } from '@shared/types';
import React from 'react';

// (?<!['-]) is to look behind one character '?<' and exclude '!' if previous character was not ' or -
export const capitalizeEveryWord = (str: string) => {
  const allLowerCase = str.replace(/[A-Z]/g, char => char.toLowerCase());
  return allLowerCase.replace(/\b(?<!['-])[a-z]/g, char => char.toUpperCase());
};

export const getProductAverageReviews = (product: IProduct) =>
  product.reviews.reduce((acc, current) => acc + current) /
  product.reviews.length;

export const getPriceDecimals = (price: number) => price / 100;

export const isReactFragment = (variableToInspect: any) => {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
};

// Duplicated, could not find solution to resolve imports in time
export const ensure = <T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};

export const cartPriceTotal = (cart: CartProduct[]) =>
  cart.reduce((acc, current) => {
    return acc + Math.round(current.product.price * current.amount * 100) / 100;
  }, 0);
