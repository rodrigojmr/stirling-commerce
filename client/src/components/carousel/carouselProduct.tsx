import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import { Product } from '@prisma/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeEveryWord, getProductAverageReviews } from 'utils';
import { stars } from '../styled/Stars';

interface Props {
  product: Product;
}

const ProductSlide = ({ product }: Props) => {
  const rating = getProductAverageReviews(product);

  return (
    <Link to={`/product/${product.id}`}>
      <VStack spacing=".75rem" align="start" p="1rem">
        <Flex align="center" justify="center">
          <Image objectFit="cover" src={product.image} alt={product.title} />
        </Flex>
        <Flex>{stars(rating)}</Flex>
        <Text fontWeight={'700'} fontSize="xl" color="black">
          {capitalizeEveryWord(
            `${product.brand} - ${product.title} - ${product.colors[0]} - ${product.gender}'s`
          )}
        </Text>
        <Text
          fontWeight={'600'}
          fontSize="2xl"
          fontFamily="Bebas Neue"
        >{`$${product.price}`}</Text>
      </VStack>
    </Link>
  );
};

export default ProductSlide;
