import { Box, Flex, Icon, Link, useMediaQuery } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LogoS } from 'assets/logo-s.svg';
import { RootState } from 'store/rootReducer';
import Cart from 'components/buttons/cartButton';
import Search from 'components/search/navSearch';
import User from 'components/userIcon';
import Menu from './header';
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

  const [isLargerThan768px] = useMediaQuery('(min-width: 48em)');
  console.log('isLargerThan768px: ', isLargerThan768px);

  const centerLogo = isLargerThan768px
    ? {}
    : { pos: 'absolute', left: '50%', transform: 'translateX(-50%)' };

  return (
    <Flex
      pos="relative"
      as="header"
      bg="dark-grey"
      align="center"
      px={[5, 7, 10]}
      py={[4, 6]}
      background-color="dark-grey"
      maxW="100vw"
    >
      <Link
        {...centerLogo}
        pos={['absolute', 'relative']}
        order={[3, 1]}
        ml={['auto', 'none']}
        mr={['auto', 12]}
        as={RouterLink}
        to="/"
        color="white"
      >
        <Icon
          as={isLargerThan768px ? Logo : LogoS}
          fill="white"
          w={isLargerThan768px ? '8rem' : '2.5rem'}
          h={isLargerThan768px ? '3rem' : '2.5rem'}
        />
      </Link>
      {/* TODO Fix order */}
      <Menu order={[1, 2]} links={navLinks} />
      <Search order={[user ? 2 : 4, 3]} />
      {user ? (
        <>
          <Cart order={5} />
          <User order={[4]} />
        </>
      ) : (
        <Box order={[5, 5]} mr={['none', 8]}>
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
