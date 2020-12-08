import React from 'react';
import styled from 'styled-components';
import { Text } from '../styled';
import { Stars } from '../styled/Stars';
import { SlideProduct } from '../../types';

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

const ProductSlide: React.FC<{ product: SlideProduct }> = ({ product }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={product.image} alt={product.title} />
      </ImageContainer>
      <div>{Stars(product.rating)}</div>
      <Text fontWeight={700} color="black">
        {product.title}
      </Text>
      <Text
        fontWeight={500}
        fontSize="2.3rem"
        fontFamily="Bebas Neue"
      >{`$${product.price}`}</Text>
    </Container>
  );
};

export default ProductSlide;
