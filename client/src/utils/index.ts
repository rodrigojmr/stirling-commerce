import { Product } from '@prisma/client';

// (?<!['-]) is to look behind one character '?<' and exclude '!' if previous character was not ' or -
export const capitalizeEveryWord = (str: string) => {
  const allLowerCase = str.replace(/[A-Z]/g, char => char.toLowerCase());
  return allLowerCase.replace(/\b(?<!['-])[a-z]/g, char => char.toUpperCase());
};

export const getProductAverageReviews = (product: Product) =>
  product.reviews.reduce((acc, current) => acc + current) /
  product.reviews.length;
