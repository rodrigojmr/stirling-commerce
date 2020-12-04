import React from 'react';
import styled from 'styled-components';
import { Heading, Section, Wrapper } from '../components/styled';
import theme from '../theme/theme';

import EmblaCarousel from '../components/Carousel/EmblaCarousel';
import ProductsCarousel from '../components/Carousel/ProductsCarousel';
import SlideOne from '../components/Slides/SlideOne';
import CategoryLink from '../components/CategoryLink';
import ToggleSlider from '../components/ToggleSlider';

import ProductHighlight from '../components/Products/ProductHighlight';

const carouselOptions = {
  draggable: false,
  loop: true,
  arrows: true,
  containScroll: 'keepSnaps' as const,
  dragFree: false
};

// TODO Add graphics around this section
const SecondSection = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AcessoriesSection = styled(Section)`
  padding: 0;
  display: flex;
`;

const RecommendedSection = styled(Section)<{ text: string }>`
  position: relative;

  &::before {
    content: ${({ text }) => `"${text}"`};
    position: absolute;
    z-index: -1;
    color: ${({ theme }) => theme.colors.lightGrey};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Bebas Neue';
    width: 100%;
    font-size: 20vw;
    letter-spacing: 7.5vw;
  }
`;

const products = [
  {
    image: './images/products/shirts/puma shirt.webp',
    rating: 4,
    title: 'Pume - Essential Big Cat Tee - Grey Heather - Mens',
    price: 30.99
  },
  {
    image: './images/products/shirts/puma shirt.webp',
    rating: 4,
    title: 'Pume - Essential Big Cat Tee - Grey Heather - Mens',
    price: 30.99
  },
  {
    image: './images/products/shirts/puma shirt.webp',
    rating: 4,
    title: 'Pume - Essential Big Cat Tee - Grey Heather - Mens',
    price: 30.99
  },
  {
    image:
      'https://images-na.ssl-images-amazon.com/images/I/71N2PFtrYcL._UL1500_.jpg',
    rating: 3,
    title: 'Puma - Ignite Flash EvoKNIT - Black - Mens',
    price: 99.99
  },
  {
    image:
      'https://www.decathlon.ie/media/catalog/product/cache/2/image/600x450/9df78eab33525d08d6e5fb8d27136e95/3/8/38_p1536138_8516951.jpg',
    rating: 5,
    title: 'Nike - Pro Hypercool Capri - Black - Womens',
    price: 49.99
  },
  {
    image:
      'https://www.decathlon.ie/media/catalog/product/cache/2/image/600x450/9df78eab33525d08d6e5fb8d27136e95/3/8/38_p1536138_8516951.jpg',
    rating: 5,
    title: 'Nike - Pro Hypercool Capri - Black - Womens',
    price: 49.99
  }
];

const Home = () => {
  return (
    <>
      <EmblaCarousel options={carouselOptions}>
        <SlideOne background="/images/carousel-bicycle.webp" />
        <SlideOne background="/images/carousel-bicycle.webp" />
      </EmblaCarousel>
      <SecondSection backgroundColor={theme.colors.lightGrey}>
        <Heading color="black" fontSize="4rem" as="h1">
          <>
            Where all the leading sports brands come to play, <br /> we bring
            you stirling sports
          </>
        </Heading>
      </SecondSection>
      <Section>
        <Wrapper>
          <ProductsCarousel
            options={{
              loop: false,
              draggable: true,
              arrows: false,
              dragFree: true,
              containScroll: 'keepSnaps' as const
            }}
            products={products}
          />
        </Wrapper>
      </Section>
      <AcessoriesSection>
        <CategoryLink
          category="Acessories"
          colorScheme="primary"
          image="./images/football.webp"
          link="/football/accessories"
          title="Football"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
          molestiae.
        </CategoryLink>
        <CategoryLink
          category="Acessories"
          colorScheme="dark"
          image="./images/basketball-jersey.webp"
          link="/basketball/acessories"
          title="Basketball"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
          molestiae.
        </CategoryLink>
      </AcessoriesSection>
      <RecommendedSection text="running">
        <Wrapper>
          <ToggleSlider title="This week we recommend">
            <ProductHighlight
              product={{
                image: './images/products/shoes/Puma Sneaker.webp',
                title: 'Puma - Ignite Flash EvoKNIT - Black - Mens',
                rating: 4,
                price: 30.99
              }}
            />
            <ProductHighlight
              product={{
                image: './images/products/shoes/running-shoes-2.webp',
                rating: 5,
                title: "Pume - Essential Big Cat Tee - Grey Heather - Women's",
                price: 99.99
              }}
            />
          </ToggleSlider>
        </Wrapper>
      </RecommendedSection>
    </>
  );
};

export default Home;
