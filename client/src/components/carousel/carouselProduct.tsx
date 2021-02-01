import React from 'react';
import styled from '@emotion/styled';
import { Box, Image, Text, Flex, VStack } from '@chakra-ui/react';
import { stars } from '../styled/Stars';
import { Link } from 'react-router-dom';
import { capitalizeEveryWord } from '../../utils';

interface Props {
  product: Product;
}

const ProductSlide = ({ product }: Props) => {
  return (
    <Link to={`/product/${product._id}`}>
      <VStack spacing=".75rem" align="start" p="1rem">
        <Flex align="center" justify="center">
          <Image objectFit="cover" src={product.image} alt={product.title} />
        </Flex>
        <Flex>{stars(product.rating)}</Flex>
        <Text fontWeight={'700'} fontSize="xl" color="black">
          {capitalizeEveryWord(
            `${product.brand} - ${product.title} - ${product.color} - ${product.gender}'s`
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
