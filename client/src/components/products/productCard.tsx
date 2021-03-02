import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { IProduct } from '@shared/types';
import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeEveryWord, getProductAverageReviews } from 'utils';
import { stars } from '../styled/Stars';

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const rating = getProductAverageReviews(product);

  return (
    <Box position="relative" bg="gray.100" p="1rem">
      <Link to={`/product/${product.id}`}>
        <Flex
          flexDir="column"
          height="100%"
          align="start"
          p="1rem"
          css={css`
            > *:not(:last-child) {
              margin-bottom: 0.75rem;
            }
          `}
        >
          <Flex align="center" justify="center">
            <Image objectFit="cover" src={product.image} alt={product.title} />
          </Flex>
          <Text fontWeight={'700'} fontSize={{ base: 'xl' }} color="black">
            {capitalizeEveryWord(
              `${product.brand} - ${product.title} - ${product.colors[0]}'s`
            )}
          </Text>
          <Flex>{stars(rating)}</Flex>
          <Text
            alignSelf="end"
            fontWeight={'600'}
            fontSize="2xl"
            fontFamily="Bebas Neue"
          >{`$${product.price}`}</Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProductCard;
