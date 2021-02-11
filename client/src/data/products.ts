import { Product } from '@prisma/client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import ensure from 'utils/ensure';

export interface ProductsWithHighlightPoints extends Product {
  highlights: HighlightPoints[];
}

export interface HighlightPoints {
  x: string;
  y: string;
  text: string;
}

export const createHighlightedProduct = (
  product: Product,
  highlights: HighlightPoints[]
) => ({ ...product, highlights });

export const homeProductOneHighlights: HighlightPoints[] = [
  {
    x: '34%',
    y: '20%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '44%',
    y: '43%',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    x: '7%',
    y: '43%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '80%',
    y: '50%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '60%',
    y: '68%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '16%',
    y: '74%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  }
];

export const homeProductTwoHighlights: HighlightPoints[] = [
  {
    x: '34%',
    y: '20%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '44%',
    y: '43%',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    x: '7%',
    y: '43%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '80%',
    y: '50%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '60%',
    y: '68%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  },
  {
    x: '16%',
    y: '74%',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
  }
];
