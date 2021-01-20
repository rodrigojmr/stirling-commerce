import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useLayoutEffect, useRef } from 'react';
import ButtonLink from '../Buttons/ButtonLink';
import HighlightDot from '../HighlightDot';
import { ProductTitle } from '../styled';
import { stars } from '../styled/Stars';

const ProductContainer = styled.article`
  display: flex;
  height: 600px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 65%;
  text-align: center;
`;

const StyledImage = styled.img`
  display: block;
  position: relative;
  margin: 0 auto;
  object-fit: cover;
  width: 107%;
`;

const ProductDetails = styled.div`
  padding-left: 5vw;
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
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

  return (
    <ProductContainer>
      <ImageContainer ref={imgContainerRef}>
        <StyledImage ref={imgRef} src={product.image} alt={product.title} />
        {product.highlightPoints.map(point => (
          <HighlightDot {...point} />
        ))}
      </ImageContainer>
      <ProductDetails>
        <div>{stars(product.rating)}</div>
        <ProductTitle as="h2" color="black" fontSize="3rem">
          {product.title}
        </ProductTitle>
        <Text
          fontWeight={500}
          fontSize="3.5rem"
          fontFamily="Bebas Neue"
        >{`$${product.price}`}</Text>
        <ButtonLink to={'#'} borderColor="primary.500" iconColor="primary.500">
          Shop Now
        </ButtonLink>
      </ProductDetails>
    </ProductContainer>
  );
};

export default ProductHighlight;
