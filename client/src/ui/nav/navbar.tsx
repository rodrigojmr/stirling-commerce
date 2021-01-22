import { Flex, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { RootState } from '../../store/rootReducer';
import Cart from 'components/buttons/cartButton';
import Search from 'components/search/navSearch';
import User from 'components/userIcon';
import Menu from './navMenu';

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

const navLinks: Link[] = [
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

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Flex
      bg="dark-grey"
      align="center"
      px={12}
      py={6}
      background-color="dark-grey"
    >
      <Link as={RouterLink} to="/" color="white">
        <StyledLogo />
      </Link>
      <Menu links={navLinks} />
      <Search />
      <User />
      <Cart />
    </Flex>
  );
};

export default Navbar;
