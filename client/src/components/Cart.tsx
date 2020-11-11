import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CartLogo } from '../assets/shopping-cart.svg';

const StyledContainer = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2rem;
  color: white;
  font-family: 'Bebas Neue';

  & > *:not(:last-child) {
    margin-right: 0.75rem;
  }
`;

const StyledCartLogo = styled(CartLogo)`
  fill: white;
  stroke: white;
  height: 2rem;
  width: 2rem;
`;

const Cart = () => {
  return (
    <StyledContainer>
      <StyledCartLogo />
      <span>Cart</span>
    </StyledContainer>
  );
};

// TODO Get items with redux, show length

export default Cart;
