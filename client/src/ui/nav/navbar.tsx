import { Flex, Icon, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { RootState } from 'store/rootReducer';
import Cart from 'components/buttons/cartButton';
import Search from 'components/search/navSearch';
import User from 'components/userIcon';
import Menu from './navMenu';
import { ReactComponent as loginIcon } from 'assets/log-in.svg';
import { requestLogin } from 'features/auth/userSlice';

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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Flex
      as="header"
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
      {user ? (
        <User />
      ) : (
        <Icon
          onClick={() =>
            dispatch(
              requestLogin({ username: 'asddasdas', password: 'dashdkass' })
            )
          }
          as={loginIcon}
          stroke="white"
          w={10}
          h={10}
          mr={8}
        />
      )}
      <Cart />
    </Flex>
  );
};

export default Navbar;
