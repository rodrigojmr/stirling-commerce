import React from 'react';
import styled, { css } from 'styled-components';

import {
  FlexApartWrapper,
  Heading,
  Section,
  Wrapper,
  StyledLink,
  CenteringFlex
} from '../components/styled';
import theme from '../theme/theme';

import EmblaCarousel from '../components/Carousel/EmblaCarousel';
import ProductsCarousel from '../components/Carousel/ProductsCarousel';
import SlideOne from '../components/Slides/SlideOne';
import CategoryLink from '../components/CategoryLink';
import ToggleSlider from '../components/ToggleSlider';
import ProductHighlight from '../components/Products/ProductHighlight';

import {
  featuredProducts,
  highlightedProducts,
  newProducts
} from '../data/products';

const carouselOptions = {
  draggable: false,
  loop: true,
  arrows: true,
  containScroll: 'keepSnaps' as const,
  dragFree: false
};

// TODO Add graphics around this section
const CenteringSection = styled(Section)`
  ${CenteringFlex}
`;

const CarouselHeader = styled(FlexApartWrapper)`
  margin-bottom: 5rem;
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
    overflow: hidden;
  }
`;

const NewProductsSection = styled(Section)`
  background: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme.colors.lightGrey} 50%, white 0%)`};
`;

const Home = () => {
  return (
    <>
      <EmblaCarousel options={carouselOptions}>
        <SlideOne background="/images/carousel-bicycle.webp" />
        <SlideOne background="/images/carousel-bicycle.webp" />
      </EmblaCarousel>
      <CenteringSection backgroundColor={theme.colors.lightGrey}>
        <Heading color="black" fontSize="4rem" as="h1">
          <>
            Where all the leading sports brands come to play, <br /> we bring
            you stirling sports
          </>
        </Heading>
      </CenteringSection>
      <Section>
        <Wrapper>
          <CarouselHeader>
            <Heading color="black" as="h2" fontSize="3rem">
              Featured Products
            </Heading>
            <StyledLink color={theme.colors.primary} fontSize="2.5rem" to="#">
              View All &gt;
            </StyledLink>
          </CarouselHeader>
          <ProductsCarousel
            options={{
              loop: false,
              draggable: true,
              arrows: false,
              dragFree: true,
              containScroll: 'keepSnaps' as const
            }}
            products={featuredProducts}
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
            <ProductHighlight product={highlightedProducts[0]} />
            <ProductHighlight product={highlightedProducts[1]} />
          </ToggleSlider>
        </Wrapper>
      </RecommendedSection>
      <NewProductsSection>
        <Wrapper>
          <CarouselHeader>
            <Heading color="black" as="h2" fontSize="3rem">
              New Footwear
            </Heading>
            <StyledLink color={theme.colors.primary} fontSize="2.5rem" to="#">
              View All &gt;
            </StyledLink>
          </CarouselHeader>
          <ProductsCarousel
            options={{
              loop: false,
              draggable: true,
              arrows: false,
              dragFree: true,
              containScroll: 'keepSnaps' as const
            }}
            products={newProducts}
          />
        </Wrapper>
      </NewProductsSection>
      <CenteringSection css="background-color: red">
        <Heading color="black" fontSize="4rem" as="h1">
          <>
            Be first to get new information <br /> About new products
          </>
        </Heading>
      </CenteringSection>
    </>
  );
};

export default Home;
