/* @jsxImportSource @emotion/react */
import { Box, Button, Flex, Icon, Link, useMediaQuery } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactComponent as loginIcon } from 'assets/log-in.svg';
import { ReactComponent as LogoS } from 'assets/logo-s.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Cart from 'components/buttons/cartButton';
import Search from 'components/search/navSearch';
import User from 'components/userIcon';
import { requestLogin } from 'features/auth/userSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from 'store/rootReducer';
import Menu from './headerMenu';

const StyledLogo = styled(Icon)`
  // Customize logo color, otherwise it would show as grey
  // Large logo
  & .st0 {
    fill: white;
  }
  & .st2 {
    fill: white;
  }
  // Small logo
  & .cls-3 {
    fill: white;
  }

  #linear-gradient {
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

  const [isLargerThan768px] = useMediaQuery('(min-width: 48em)');
  const [isLargerThan991px] = useMediaQuery('(min-width: 62em)');

  const searchBtnOrder: number = user ? 2 : 4;

  return (
    <Flex
      pos="relative"
      as="header"
      bg="dark-grey"
      align="center"
      px={{ base: 5, sm: 7, md: 10 }}
      py={{ base: 5, sm: 6 }}
      background-color="dark-grey"
      maxW="100vw"
    >
      <Link
        position={{ base: 'absolute', md: 'relative' }}
        left={{ base: '50%', md: 'initial' }}
        transform={{ base: 'translateX(-50%)', md: 'initial' }}
        order={{ base: 3, md: 'initial' }}
        ml={['auto', 'initial']}
        mr={['auto', 6]}
        as={RouterLink}
        to="/"
        color="white"
      >
        <StyledLogo
          as={isLargerThan991px ? Logo : LogoS}
          fill="white"
          w={isLargerThan991px ? '15rem' : '2.5rem'}
          h={isLargerThan991px ? '3rem' : '2.5rem'}
        />
      </Link>
      {/* TODO Fix order */}
      <Menu order={{ base: 1, md: 'initial' }} links={navLinks} />
      <Search order={{ base: 1, md: 'initial' }} />
      {user ? (
        <>
          <User order={{ base: 4, md: 'initial' }} />
          <Cart order={{ base: 5, md: 'initial' }} />
        </>
      ) : (
        <Box order={{ base: 5, md: 'initial' }} mr={['none', 8]}>
          <Icon
            onClick={() =>
              dispatch(
                requestLogin({ username: 'asddasdas', password: 'dashdkass' })
              )
            }
            as={loginIcon}
            stroke="white"
            w={[8, 10]}
            h={[8, 10]}
          />
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
