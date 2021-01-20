import { Box, Flex, theme, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import EmblaCarousel from '../components/Carousel/EmblaCarousel';
import ProductsCarousel from '../components/Carousel/ProductsCarousel';
import CategoryLink from '../components/CategoryLink';
import NewsletterForm from '../components/Form/NewsletterForm';
import ProductHighlight from '../components/Products/ProductHighlight';
import SlideOne from '../components/Slides/SlideOne';
import { Heading } from '@chakra-ui/react';
import ToggleSlider from '../components/ToggleSlider';
import { allProducts } from '../data/products';
import { Link as RouterLink } from 'react-router-dom';

const carouselOptions = {
  draggable: false,
  loop: true,
  arrows: true,
  containScroll: 'keepSnaps' as const,
  dragFree: false
};

const FormContainer = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  width: 70vw;
  max-width: 100rem;
`;

const Image = styled.img`
  width: 100%;
`;

const Home = () => {
  // TODO Replace duplicated values with new products

  // TODO Add typing?
  const featuredProducts = [
    ...allProducts.filter(product => product.featured),
    ...allProducts.filter(product => product.featured)
  ];

  const highlightedProducts: ProductsWithHighlightPoints[] = allProducts.filter(
    (product): product is ProductsWithHighlightPoints =>
      product.hasOwnProperty('highlightPoints')
  );

  type newProduct = Overwrite<Product, { new: true }>;

  const newProducts: newProduct[] = allProducts.filter(
    (product): product is newProduct => product.new === true
  );

  const allNewProducts = [...newProducts, ...newProducts];

  return (
    <>
      <EmblaCarousel options={carouselOptions}>
        <SlideOne background="/images/carousel-bicycle.webp" />
        <SlideOne background="/images/carousel-bicycle.webp" />
      </EmblaCarousel>
      <Flex justify="center" align="center" direction="column" bg="light-grey">
        <Heading fontSize="4rem" as="h1">
          <>
            Where all the leading sports brands come to play, <br /> we bring
            you stirling sports
          </>
        </Heading>
      </Flex>
      <Box as="section">
        <Box size="max">
          <Flex mb={2}>
            <Heading as="h2" fontSize="3rem">
              Featured Products
            </Heading>
            <Link
              as={RouterLink}
              color={theme.colors.primary}
              fontSize="2.5rem"
              to="#"
            >
              View All &gt;
            </Link>
          </Flex>
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
        </Box>
      </Box>
      <Flex as="section">
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
      </Flex>
      <Box
        as="section"
        _before={{
          content: 'running',
          zIndex: -1,
          color: 'light-grey',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'heading',
          width: '100%',
          fontSize: '20vw',
          letterSpacing: '7.5vw',
          overflow: 'hidden'
        }}
      >
        <Box size="max">
          <ToggleSlider title="This week we recommend">
            <ProductHighlight product={highlightedProducts[0]} />
            <ProductHighlight product={highlightedProducts[1]} />
          </ToggleSlider>
        </Box>
      </Box>
      <Box as="section" bgGradient="linear(to-r, light-grey 50%,white  0%)">
        <Box size="max">
          <Flex mb={2}>
            <Heading as="h2" fontSize="3rem">
              New Footwear
            </Heading>
            <Link
              as={RouterLink}
              color={theme.colors.primary}
              fontSize="2.5rem"
              to="#"
            >
              View All &gt;
            </Link>
          </Flex>
          <ProductsCarousel
            options={{
              loop: false,
              draggable: true,
              arrows: false,
              dragFree: true,
              containScroll: 'keepSnaps' as const
            }}
            products={allNewProducts}
          />
        </Box>
      </Box>
      {/* TODO Fix styled components not passing css prop */}
      <Flex
        sx={{ textAlign: 'center' }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading fontSize="4rem" as="h1">
          <>
            Be first to get new information <br /> About new products
          </>
        </Heading>
        <FormContainer>
          <NewsletterForm />
        </FormContainer>
        <Image src="./images/stretching.webp" alt="Man stretching" />
      </Flex>
    </>
  );
};

export default Home;
