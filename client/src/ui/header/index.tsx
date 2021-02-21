/* @jsxImportSource @emotion/react */
import { Button, Flex, Icon, Link, useMediaQuery } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactComponent as SignInIcon } from 'assets/log-in.svg';
import { ReactComponent as LogoS } from 'assets/logo-s.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Cart from 'components/cart/cart';
import Search from 'components/search/navSearch';
import UserIcon from 'components/userIcon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from 'store/rootReducer';
import Menu from './headerMenu';
import { useLocation } from 'react-router-dom';

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
    to: '/search/men',
    text: "Men's"
  },
  {
    to: '/search/women',
    text: "Women's"
  },
  {
    to: '/search/kids',
    text: "Kid's"
  },
  {
    to: '/search/sport',
    text: 'Sport'
  },
  {
    to: '/search/gear',
    text: 'Gear'
  },
  {
    to: '/search/new',
    text: 'New'
  }
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state: RootState) => state.auth);

  const [isLargerThan768px] = useMediaQuery('(min-width: 48em)');
  const [isLargerThan991px] = useMediaQuery('(min-width: 62em)');

  return (
    <Flex
      pos="relative"
      as="header"
      bg="dark-grey"
      align="center"
      px={{ base: 5, sm: 7, lg: 6 }}
      py={{ base: 5, sm: 5 }}
      background-color="dark-grey"
      maxW="100vw"
    >
      <Link
        position={{ base: 'absolute', lg: 'relative' }}
        left={{ base: '50%', lg: 'initial' }}
        transform={{ base: 'translateX(-50%)', lg: 'initial' }}
        order={{ base: 3, lg: 'initial' }}
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
      <Menu order={{ base: 1, lg: 'initial' }} links={navLinks} />
      <Search order={{ base: 1, lg: 'initial' }} />
      {user ? (
        <>
          <UserIcon order={{ base: 4, lg: 'initial' }} />
          <Cart order={{ base: 5, lg: 'initial' }} />
        </>
      ) : (
        <Link order={{ base: 5, lg: 'initial' }} as={RouterLink} to="/sign-in">
          <Button
            isLoading={status === 'loading'}
            bg="primary.500"
            color="white"
            _hover={{ bg: 'primary.400' }}
            _focus={{ bg: 'primary.400' }}
            rightIcon={
              <Icon as={SignInIcon} stroke="white" w={[6, 8]} h={[6, 8]} />
            }
          >
            Log In
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Navbar;
