import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Heading, Text, ButtonLink } from '../styled';
import { Stars } from '../styled/Stars';
import theme from '../../theme/theme';
import HighlightDot from '../HighlightDot';

const ProductContainer = styled.article`
  display: flex;
  height: 600px;
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
  max-height: 100%;
  max-width: 100%;
`;

const ProductDetails = styled.div`
  padding-left: 5vw;
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;

const ProdutTitle = styled(Heading)`
  font-family: 'Source Sans Pro';
  font-weight: 700;
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
        <div>{Stars(product.rating)}</div>
        <ProdutTitle as="h2" color="black" fontSize="3rem">
          {product.title}
        </ProdutTitle>
        <Text
          fontWeight={500}
          fontSize="3.5rem"
          fontFamily="Bebas Neue"
        >{`$${product.price}`}</Text>
        <ButtonLink to={'#'} themed={theme.colors.primary}>
          Shop Now
        </ButtonLink>
      </ProductDetails>
    </ProductContainer>
  );
};

export default ProductHighlight;
