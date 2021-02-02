import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeEveryWord } from '../../utils';
import { stars } from '../styled/Stars';

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
