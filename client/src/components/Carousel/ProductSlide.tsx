import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';
import { stars } from '../styled/Stars';
import { Link } from 'react-router-dom';
import { capitalizeEveryWord } from '../../utils';

const Container = styled.article`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 25rem;
  margin-bottom: 4rem;
  background-color: white;
`;

const Image = styled.img<{ src: string; alt: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`;

interface Props {
  product: Product;
}

const ProductSlide = ({ product }: Props) => {
  return (
    <Container>
      <Link to={`/product/${product._id}`}>
        <ImageContainer>
          <Image src={product.image} alt={product.title} />
        </ImageContainer>
        <div>{stars(product.rating)}</div>
        <Text fontWeight={700} color="black">
          {capitalizeEveryWord(
            `${product.brand} - ${product.title} - ${product.color} - ${product.gender}'s`
          )}
        </Text>
        <Text
          fontWeight={500}
          fontSize="2.3rem"
          fontFamily="Bebas Neue"
        >{`$${product.price}`}</Text>
      </Link>
    </Container>
  );
};

export default ProductSlide;
