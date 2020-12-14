import { useState } from 'react';
import styled from 'styled-components';
import { allProducts } from '../data/products';
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom';

const Grid = styled.main`
  display: grid;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];
`;

const ImageContainer = styled.div`
  grid-column: center-start / span 3;
`;

const SingleProduct: React.FC = ({ match }: RouteComponentProps) => {
  const { id } = useParams();

  setProduct(
    allProducts.find((product): product is Product => product._id === id)
  );

  return (
    <Grid>
      <ImageContainer>
        <img src={product.image} alt={product.title} />
      </ImageContainer>
    </Grid>
  );
};

export default SingleProduct;
