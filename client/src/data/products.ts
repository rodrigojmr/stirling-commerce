export const featuredProducts = [
  {
    image: '/images/products/shoes/puma-ignite-flash-evoknit.webp',
    rating: 4,
    title: 'Puma - Ignite Flash EvoKNIT - Black - Mens',
    price: 99.99
  },
  {
    image:
      '/images/products/shirts/puma-essential-big-cat-tree-grey-heather.webp',
    rating: 3,
    title: 'Pume - Essential Big Cat Tee - Grey Heather - Mens',
    price: 30.99
  },
  {
    image: '/images/products/nike-pro-hypercool-capri-black-womens.webp',
    rating: 5,
    title: 'Nike - Pro Hypercool Capri - Black - Womens',
    price: 49.99
  },
  {
    image:
      '/images/products/shoes/nike-free-rn-2017-running-shoe-black-mens.webp',
    rating: 4,
    title: 'Nike - Free RN 2017 Running Shoe - Black - Mens',
    price: 99.99
  },
  {
    image: '/images/products/shoes/puma-ignite-flash-evoknit.webp',
    rating: 4,
    title: 'Puma - Ignite Flash EvoKNIT - Black - Mens',
    price: 99.99
  },
  {
    image:
      '/images/products/shirts/puma-essential-big-cat-tree-grey-heather.webp',
    rating: 3,
    title: 'Pume - Essential Big Cat Tee - Grey Heather - Mens',
    price: 30.99
  },
  {
    image: '/images/products/nike-pro-hypercool-capri-black-womens.webp',
    rating: 5,
    title: 'Nike - Pro Hypercool Capri - Black - Womens',
    price: 49.99
  },
  {
    image:
      '/images/products/shoes/nike-free-rn-2017-running-shoe-black-mens.webp',
    rating: 4,
    title: 'Nike - Free RN 2017 Running Shoe - Black - Mens',
    price: 99.99
  }
];

export const highlightedProducts = [
  {
    image: '/images/products/shoes/adidas-originals-swift-run-cargo-mens.webp',
    title: 'Adidas Originals - Swift Run - Black - Mens',
    rating: 5,
    price: 140.99,
    highlightPoints: [
      {
        x: '30%',
        y: '20%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '44%',
        y: '36%',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        x: '14%',
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
    ]
  },
  {
    image:
      "/images/products/shoes/floatride-fuel-run-women's-running-shoes.webp",
    rating: 5,
    title: "Reebok - Floatride Fuel Run - Blue - Women's",
    price: 99.99,
    highlightPoints: [
      {
        x: '10%',
        y: '35%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '10%',
        y: '65%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '43%',
        y: '32%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '55%',
        y: '50%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '90%',
        y: '55%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      }
    ]
  }
];

export const newProducts = [
  {
    image: '/images/products/shoes/rebook-ex-o-fit_hi_black.webp',
    rating: 4,
    title: 'reebok - Ex-O-Fit Hi - Black - Mens',
    price: 179.99
  },
  {
    image: '/images/products/shoes/rebook-classic_nylon_white_standard.webp',
    rating: 3,
    title: 'Rebook - Classic Nylon - White/Pink - Womens',
    price: 120.99
  },
  {
    image: '/images/products/shoes/nike-free-tr-v8.webp',
    rating: 5,
    title: 'Nike - Free TR V8 - Grey - Mens',
    price: 109.99
  },
  {
    image: '/images/products/shoes/rebook-classic_nylon_shoes_black.webp',
    rating: 4,
    title: 'Rebook - Classic Slide - Black - Mens',
    price: 200.99
  },
  {
    image: '/images/products/shoes/rebook-ex-o-fit_hi_black.webp',
    rating: 4,
    title: 'reebok - Ex-O-Fit Hi - Black - Mens',
    price: 179.99
  },
  {
    image: '/images/products/shoes/rebook-classic_nylon_white_standard.webp',
    rating: 3,
    title: 'Rebook - Classic Nylon - White/Pink - Womens',
    price: 120.99
  },
  {
    image: '/images/products/shoes/nike-free-tr-v8.webp',
    rating: 5,
    title: 'Nike - Free TR V8 - Grey - Mens',
    price: 109.99
  },
  {
    image: '/images/products/shoes/rebook-classic_nylon_shoes_black.webp',
    rating: 4,
    title: 'Rebook - Classic Slide - Black - Mens',
    price: 200.99
  }
];

type Products = Product | ProductsWithHighlightPoints;

export const allProducts: Products[] = [
  {
    _id: '1',
    image: '/images/products/shoes/puma-ignite-flash-evoknit.webp',
    rating: 4,
    title: 'Puma - Ignite Flash EvoKNIT - Black - Mens',
    brand: 'puma',
    color: 'black',
    type: ['footwear'],
    gender: 'men',
    price: 99.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: true,
    new: false
  },
  {
    _id: '2',
    image:
      '/images/products/shirts/puma-essential-big-cat-tree-grey-heather.webp',
    rating: 3,
    title: 'Puma - Essential Big Cat Tee - Grey Heather - Mens',
    brand: 'puma',
    color: 'grey heather',
    type: ['tee'],
    gender: 'men',
    price: 30.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: true,
    new: false
  },
  {
    _id: '3',
    image: '/images/products/nike-pro-hypercool-capri-black-womens.webp',
    rating: 5,
    title: 'Nike - Pro Hypercool Capri - Black - Womens',
    brand: 'nike',
    color: 'black',
    type: ['pants'],
    gender: 'women',
    price: 49.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: true,
    new: false
  },
  {
    _id: '4',
    image:
      '/images/products/shoes/nike-free-rn-2017-running-shoe-black-mens.webp',
    rating: 4,
    title: 'Nike - Free RN 2017 Running Shoe - Black - Mens',
    brand: 'nike',
    color: 'black',
    type: ['shoes', 'running'],
    gender: 'women',
    price: 99.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: true,
    new: false
  },
  {
    _id: '5',
    image: '/images/products/shoes/rebook-ex-o-fit_hi_black.webp',
    rating: 4,
    title: 'Reebok - Ex-O-Fit Hi - Black - Mens',
    brand: 'reebok',
    color: 'black',
    type: ['shoes'],
    gender: 'women',
    price: 179.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: false,
    new: true
  },
  {
    _id: '6',
    image: '/images/products/shoes/rebook-classic_nylon_white_standard.webp',
    rating: 3,
    title: 'Rebook - Classic Nylon - White/Pink - Womens',
    brand: 'reebok',
    color: 'white/pink',
    type: ['shoes'],
    gender: 'women',
    price: 120.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: false,
    new: true
  },
  {
    _id: '7',
    image: '/images/products/shoes/nike-free-tr-v8.webp',
    rating: 5,
    title: 'Nike - Free TR V8 - Grey - Mens',
    brand: 'nike',
    color: 'grey',
    type: ['shoes'],
    gender: 'men',
    price: 109.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: false,
    new: true
  },
  {
    _id: '8',
    image: '/images/products/shoes/rebook-classic_nylon_shoes_black.webp',
    rating: 4,
    title: 'Rebook - Classic Slide - Black - Mens',
    brand: 'rebook',
    color: 'black',
    type: ['shoes'],
    gender: 'men',
    price: 200.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: false,
    new: true
  },
  {
    _id: '9',
    image: '/images/products/shoes/adidas-originals-swift-run-cargo-mens.webp',
    title: 'Adidas Originals - Swift Run - Black - Mens',
    brand: 'adidas',
    color: 'black',
    type: ['shoes'],
    gender: 'men',
    rating: 5,
    price: 140.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: false,
    new: false,
    highlightPoints: [
      {
        x: '30%',
        y: '20%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '44%',
        y: '36%',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        x: '14%',
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
    ]
  },
  {
    _id: '10',
    image:
      "/images/products/shoes/floatride-fuel-run-women's-running-shoes.webp",
    rating: 5,
    title: "Reebok - Floatride Fuel Run - Blue - Women's",
    brand: 'reebok',
    color: 'grey',
    type: ['shoes'],
    gender: 'men',
    price: 99.99,
    description: '',
    stock: '',
    numReviews: '',
    featured: false,
    new: false,
    highlightPoints: [
      {
        x: '10%',
        y: '35%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '10%',
        y: '65%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '43%',
        y: '32%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '55%',
        y: '50%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      },
      {
        x: '90%',
        y: '55%',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis assumenda accusamus voluptates?'
      }
    ]
  }
];
