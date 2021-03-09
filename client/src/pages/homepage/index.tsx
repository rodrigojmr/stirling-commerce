import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Link,
  Heading,
  Container,
  Center,
  Image
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import EmblaCarousel from 'components/carousel/emblaCarousel';
import ProductsCarousel from 'components/carousel/productsCarousel';
import CategoryLink from 'components/categoryCTA';
import NewsletterForm from 'components/form/newsletterForm';
import ProductHighlight from 'components/products/productHighlight';
import SlideOne from 'pages/homepage/slides/slideOne';
import ToggleSlider from 'components/toggleSlider';
import {
  homeProductOneHighlights,
  ProductsWithHighlightPoints
} from '../../data/products';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Product } from '@prisma/client';
import { IProduct } from '@shared/types';
import { useAppDispatch } from 'store';
import { requestProducts } from 'store/slices/catalogSlice';
import { ensure } from 'utils';
import Loader from 'components/Loader';

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

const Home = () => {
  // TODO Replace duplicated values with new products
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestProducts());
  }, []);

  const products = useSelector((state: RootState) => state.catalog.products);

  const [highlightedProducts, setHighlightedProducts] = useState<
    ProductsWithHighlightPoints[]
  >();

  useEffect(() => {
    if (products && products?.length > 0) {
      const firstHighlightedProduct = ensure(
        products?.find(product => product.title.toLowerCase().includes('swift'))
      );
      const secondHighlightedProduct = ensure(
        products?.find(product => product.title.toLowerCase().includes('fuel'))
      );
      setHighlightedProducts([
        { ...firstHighlightedProduct, highlights: homeProductOneHighlights },
        { ...secondHighlightedProduct, highlights: homeProductOneHighlights }
      ]);
    }
  }, [products]);

  // From JSON
  // const featuredProducts = [
  //   ...allProducts.filter(product => product.featured),
  //   ...allProducts.filter(product => product.featured)
  // ];
  const featuredProducts = (products: IProduct[]) => [
    ...products.slice(0, 4),
    ...products.slice(0, 4)
  ];

  const newFootwear = (products: IProduct[]) => {
    const randomFootwear = products.filter(product =>
      product.categories.some(
        category => category.name.toLowerCase() === 'shoes'
      )
    );
    return [...randomFootwear.slice(0, 4), ...randomFootwear.slice(0, 4)];
  };

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
      <Box py={[16, 20, 24]} as="section" bg="light-grey">
        <Container maxW="max" centerContent>
          <Heading
            fontSize={{ base: '3xl', lg: '4xl' }}
            textAlign="center"
            as="h1"
          >
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
        {products && (
          <ProductsCarousel
            options={{
              loop: false,
              draggable: true,
              arrows: false,
              dragFree: true,
              containScroll: 'keepSnaps' as const
            }}
            products={featuredProducts(products)}
          />
        )}
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
        px={{ base: '5vw', lg: 0 }}
        _before={{
          content: { base: `""`, lg: `"running"` },
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
          {!highlightedProducts || highlightedProducts.length !== 2 ? (
            <Center height="600px" width="100%"></Center>
          ) : (
            <ToggleSlider title="This week we recommend">
              <ProductHighlight product={highlightedProducts[0]} />
              <ProductHighlight product={highlightedProducts[1]} />
            </ToggleSlider>
          )}
        </Box>
      </Box>
      {/* New Items */}
      <Box
        as="section"
        py={24}
        bgGradient="linear(to-b, light-grey 50%,white  0%)"
      >
        <Box margin="0 auto" maxWidth="max">
          <Flex mx="3vw" justify="space-between" mb={2}>
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
            products={products ? newFootwear(products) : undefined}
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
        <Heading fontSize={{ base: '3xl', lg: '4xl' }} as="h1">
          <>
            Be first to get new information <br /> About new products
          </>
        </Heading>
        <Box my="2rem" width={{ base: '90%', lg: '70vw' }} maxWidth="50rem">
          <NewsletterForm />
        </Box>
        <Flex width="100%" overflow="hidden" align="center" justify="center">
          <Image
            width={{ base: '250%', lg: '150%' }}
            src="/images/stretching.webp"
            alt="Man stretching"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
