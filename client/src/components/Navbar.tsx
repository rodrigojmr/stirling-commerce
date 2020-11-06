import React from 'react';
import styled from 'styled-components';
import { StyledLink } from './styled/index';

const Nav = styled.nav`
  padding: 2rem 3rem;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  return (
    <Nav>
      <StyledLink to="/" color="white" fontSize="1.4rem"></StyledLink>
    </Nav>
  );
};

export default Navbar;
