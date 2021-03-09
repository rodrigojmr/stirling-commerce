import { Flex, Text, VStack, Heading, Box, Grid } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useLayoutEffect, useRef } from 'react';
import ButtonLink from '../buttons/buttonLink';
import HighlightDot from './highlightDot';
import { stars } from '../styled/Stars';
import { ProductsWithHighlightPoints } from 'data/products';
import { getProductAverageReviews } from 'utils';

const StyledImage = styled.img`
  display: block;
  position: relative;
  margin: 0 auto;
  object-fit: cover;
  width: 107%;
`;

// TODO Set product prop as a product with product:  image, title, price, rating, link to product, and highlights for points

const ProductHighlight: React.FC<{ product: ProductsWithHighlightPoints }> = ({
  product
}) => {
  const imgContainerRef = useRef<HTMLDivElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);

  let heightOffset = 0;

  useLayoutEffect(() => {
    const containerHeight = imgContainerRef?.current.clientHeight;
    const imgHeight = imgRef?.current.clientHeight;

    heightOffset = containerHeight - imgHeight;
  }, []);

  const rating = getProductAverageReviews(product);

  return (
    <Flex as="article" direction={{ base: 'column', lg: 'row' }}>
      <Flex
        flexBasis="65%"
        position="relative"
        alignItems="center"
        justifyContent="ceter"
        textAlign="center"
        ref={imgContainerRef}
      >
        <StyledImage ref={imgRef} src={product.image} alt={product.title} />
        {product.highlights.map((point, i) => (
          <HighlightDot key={i} {...point} />
        ))}
      </Flex>
      <VStack
        flexBasis="35%"
        pl="5vw"
        spacing={{ base: '.75rem', lg: '1.7rem' }}
        justifyContent="center"
        align="start"
      >
        <Flex>{stars(rating)}</Flex>
        <Heading
          fontFamily="body"
          as="h2"
          color="black"
          fontSize={{ base: '3xl', lg: '4xl' }}
        >
          {product.title}
        </Heading>
        <Text
          fontWeight={'600'}
          fontSize={{ base: '3xl', lg: '4xl' }}
          fontFamily="Bebas Neue"
        >{`$${product.price}`}</Text>
        <ButtonLink
          fontSize={{ base: '2xl', lg: '3xl' }}
          to={'#'}
          color="primary.500"
          buttonColor="primary.500"
          iconColor="white"
        >
          Shop Now
        </ButtonLink>
      </VStack>
    </Flex>
  );
};

export default ProductHighlight;
