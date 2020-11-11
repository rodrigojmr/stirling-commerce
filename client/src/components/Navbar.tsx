import React from 'react';
import styled from 'styled-components';
import { StyledLink } from './styled';
import { ReactComponent as Logo } from '../assets/logo.svg';

import Search from './Search';
import User from './User';
import Cart from './Cart';

const Nav = styled.nav`
  padding: 2rem 3rem;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  fill: white;
  width: 200px;
  display: inline-block;
  margin-right: 3rem;
  & .st0 {
    fill: white;
  }
  & .st2 {
    fill: white;
  }

  .gradient-1-stop {
    color: white;
  }
  .gradient-2-stop {
    color: transparent;
  }
`;

const navLinks: { to: string; text: string }[] = [
  {
    to: '/men',
    text: "Men's"
  },
  {
    to: '/women',
    text: "Women's"
  },
  {
    to: '/kids',
    text: "Kid's"
  },
  {
    to: '/sport',
    text: 'Sport'
  },
  {
    to: '/gear',
    text: 'Gear'
  },
  {
    to: '/new',
    text: 'New'
  }
];

const StyledList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;

  > li:not(:last-child) {
    padding: 1rem;
    margin-right: 1rem;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <StyledLink to="/" color="white" fontSize="1.4rem">
        <StyledLogo />
      </StyledLink>
      <StyledList>
        {navLinks.map(link => {
          return (
            <li style={{ fontSize: '2.4rem' }}>
              <StyledLink to={link.to} color="white" fontSize="inherit">
                {link.text}
              </StyledLink>
            </li>
          );
        })}
      </StyledList>
      <Search />
      <User />
      <Cart />
    </Nav>
  );
};

export default Navbar;
