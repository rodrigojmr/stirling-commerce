import { categories } from './data';

export const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'Men', link: '#' },
      { name: 'Women', link: '#' },
      { name: 'Kids', link: '#' },
      { name: 'Sport', link: '#' },
      { name: 'Gear', link: '#' }
    ]
  },
  {
    title: 'Shop',
    links: [
      { name: 'About Us', link: '#' },
      { name: 'Contact Us', link: '#' },
      { name: 'Store Locator', link: '#' },
      { name: 'Terms & Conditions', link: '#' },
      { name: 'Privacy Policy', link: '#' }
    ]
  },
  {
    title: 'Shop',
    links: [
      { name: 'Frequently Asked Questions', link: '#' },
      { name: 'Shipping', link: '#' },
      { name: 'Returns and Exchanges', link: '#' },
      { name: 'Size Guides', link: '#' },
      { name: 'Giftcards', link: '#' }
    ]
  }
];

export const navLinks: Link[] = [
  ...categories.map(category => ({
    to: `/search/${category}`,
    text: category[0].toUpperCase() + category.slice(1)
  }))
];
