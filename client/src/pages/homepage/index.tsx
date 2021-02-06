import { Box, Flex, Link, Heading, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import EmblaCarousel from 'components/carousel/emblaCarousel';
import ProductsCarousel from 'components/carousel/productsCarousel';
import CategoryLink from 'components/categoryCTA';
import NewsletterForm from 'components/form/newsletterForm';
import ProductHighlight from 'components/products/productHighlight';
import SlideOne from 'pages/homepage/slides/slideOne';
import ToggleSlider from 'components/toggleSlider';
import { allProducts } from '../../data/products';
import { Link as RouterLink } from 'react-router-dom';

const carouselOptions = {
  draggable: false,
  loop: true,
  arrows: true,
  containScroll: 'keepSnaps' as const,
  dragFree: false
};

const FormContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
  width: 70vw;
  max-width: 50rem;
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
      {/* Sliders */}
      <Box as="section">
        <EmblaCarousel options={carouselOptions}>
          <SlideOne background="/images/carousel-bicycle.webp" />
          <SlideOne background="/images/carousel-bicycle.webp" />
        </EmblaCarousel>
      </Box>

      {/* Tagline Section */}
      <Box py={24} as="section" bg="light-grey">
        <Container maxW="max" centerContent>
          <Heading fontSize="4xl" textAlign="center" as="h1">
            <>
              Where all the leading sports brands come to play, <br /> we bring
              you stirling sports
            </>
          </Heading>
        </Container>
      </Box>
      {/* Featured Products */}
      <Container py={24} maxW="max" as="section">
        <Flex mx="3vw" justifyContent="space-between" mb={2}>
          <Heading as="h2" fontSize="3xl">
            Featured Products
          </Heading>
          <Link as={RouterLink} color="primary.500" fontSize="2xl" to="#">
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
      </Container>
      {/* Accessories Section */}
      <Flex as="section" flexDirection={['column', 'column', 'row']}>
        <CategoryLink
          color="black"
          category="Acessories"
          buttonColor="black"
          bg="primary.500"
          image="./images/football.webp"
          link="/football/accessories"
          title="Football"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
          molestiae.
        </CategoryLink>
        <CategoryLink
          category="Acessories"
          bg="black"
          color="primary.500"
          buttonColor="primary.500"
          image="./images/basketball-jersey.webp"
          link="/basketball/acessories"
          title="Basketball"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
          molestiae.
        </CategoryLink>
      </Flex>
      {/* Recommended Product */}
      <Box
        as="section"
        position="relative"
        py={24}
        _before={{
          content: `"running"`,
          fontFamily: 'Bebas Neue',
          fontWeight: '600',
          fontSize: '22vw',
          position: 'absolute',
          zIndex: -1,
          color: 'light-grey',
          left: '52%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          letterSpacing: '5vw',
          marginRight: '-10vw',
          maxWidth: '99%',
          overflow: 'hidden'
        }}
      >
        <Box maxWidth="max" margin="0 auto">
          <ToggleSlider title="This week we recommend">
            <ProductHighlight product={highlightedProducts[0]} />
            <ProductHighlight product={highlightedProducts[1]} />
          </ToggleSlider>
        </Box>
      </Box>
      {/* New Items */}
      <Box
        as="section"
        py={24}
        bgGradient="linear(to-b, light-grey 50%,white  0%)"
      >
        <Box margin="0 auto" maxWidth="max">
          <Flex justify="space-between" mb={2}>
            <Heading as="h2" fontSize="3xl">
              New Footwear
            </Heading>
            <Link as={RouterLink} color="primary.500" fontSize="2xl" to="#">
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
      {/* Newsletter */}
      <Flex
        sx={{ textAlign: 'center' }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading fontSize="4xl" as="h1">
          <>
            Be first to get new information <br /> About new products
          </>
        </Heading>
        <FormContainer>
          <NewsletterForm />
        </FormContainer>
        <Image src="/images/stretching.webp" alt="Man stretching" />
      </Flex>
    </>
  );
};

export default Home;