import React from 'react';
import styled from 'styled-components';
import { SlideProduct } from '../../types';
import { ReactComponent as Star } from '../../assets/star.svg';

const Container = styled.article``;

const ImageContainer = styled.div`
  position: relative;
  height: 25rem;
`;

const Image = styled.img<{ src: string; alt: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`;

const StyledStar = styled(Star)<{ filled: boolean }>`
  stroke: none;
  width: 20px;
  height: 20px;
  fill: ${({ filled }) => (filled ? '#e69006' : '#a7a7a7')};
  margin-right: 5px;
`;

const Stars = (num: number) => {
  const starArray = [];
  for (let i = 1; i <= 5; i++) {
    starArray.push(<StyledStar filled={i < num} />);
  }

  return starArray;
};

const ProductSlide: React.FC<{ product: SlideProduct }> = ({ product }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={product.image} alt={product.title} />
      </ImageContainer>
      <div>{Stars(product.rating)}</div>
    </Container>
  );
};

export default ProductSlide;
