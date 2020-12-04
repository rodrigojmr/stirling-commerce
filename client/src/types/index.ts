export interface SlideProduct {
  image: string;
  rating: number;
  title: string;
  price: number;
}

export interface ProductsWithHighlightPoints extends SlideProduct {
  highlightPoints: { x: string; y: string; text: string }[];
}
