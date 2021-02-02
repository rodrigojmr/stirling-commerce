/* @jsxImportSource @emotion/react */
import { Button, Flex, Icon, Link, useMediaQuery } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactComponent as loginIcon } from 'assets/log-in.svg';
import { ReactComponent as LogoS } from 'assets/logo-s.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Cart from 'components/cart/cart';
import Search from 'components/search/navSearch';
import User from 'components/userIcon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import Menu from './headerMenu';
import { Link as RouterLink } from 'react-router-dom';
import { requestLogin } from 'store/slices/userSlice';

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

  return (
    <Flex
      pos="relative"
      as="header"
      bg="dark-grey"
      align="center"
      px={{ base: 5, sm: 7, md: 6 }}
      py={{ base: 5, sm: 5 }}
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
        <Link order={{ base: 5, md: 'initial' }} as={RouterLink} to="/sign-in">
          <Button
            // onClick={() =>
            //   dispatch(
            //     requestLogin({ username: 'asddasdas', password: 'dashdkass' })
            //   )
            // }
            bg="primary.500"
            color="white"
            _hover={{ bg: 'primary.400' }}
            _focus={{ bg: 'primary.400' }}
            rightIcon={
              <Icon as={loginIcon} stroke="white" w={[6, 8]} h={[6, 8]} />
            }
          >
            Log In
          </Button>
        </Link>
        // <Box order={{ base: 5, md: 'initial' }} mr={['none', 8]}>
        //   <Icon
        //     onClick={() =>
        //       dispatch(
        //         requestLogin({ username: 'asddasdas', password: 'dashdkass' })
        //       )
        //     }
        //     as={loginIcon}
        //     stroke="white"
        //     w={[8, 10]}
        //     h={[8, 10]}
        //   />
        // </Box>
      )}
    </Flex>
  );
};

export default Navbar;
