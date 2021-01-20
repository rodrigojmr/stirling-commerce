import { Flex, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { RootState } from '../../store/rootReducer';
import Cart from '../Cart';
import Search from '../Search/Search';
import User from '../User';
import MenuItem from './MenuItem';

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
  const user = useSelector((state: RootState) => state.user);
  return (
    <Flex
      align-items="center;"
      padding="2rem 3rem;"
      background-color="dark-grey"
    >
      <Link as={RouterLink} to="/" color="white" fontSize="1.4rem">
        <StyledLogo />
      </Link>
      <StyledList>
        {navLinks.map(link => (
          <MenuItem key={link.text.toLowerCase()} to={link.to}>
            {link.text}
          </MenuItem>
        ))}
      </StyledList>
      <Search />
      <User />
      <Cart />
    </Flex>
  );
};

export default Navbar;
