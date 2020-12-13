interface footerNavSectionType {
  title: string;
  links: {
    name: string;
    link: string;
  }[];
}

interface Product {
  _id: string;
  image: string;
  rating: number;
  title: string;
  brand: string;
  color: string;
  type: string[];
  gender: string;
  price: number;
  description: string;
  stock: string;
  numReviews: string;
  featured: boolean;
  new: boolean;
}

interface ProductsWithHighlightPoints extends Product {
  highlightPoints: { x: string; y: string; text: string }[];
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
