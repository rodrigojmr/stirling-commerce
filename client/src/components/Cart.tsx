import { Button, Flex, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { ReactComponent as CartLogo } from '../assets/shopping-cart.svg';

// const StyledContainer = styled.div`
//   display: flex;
//   padding: 1rem 1.5rem;
//   background-color: ${({ theme }) => theme.colors.primary};
//   border-radius: 2rem;
//   color: white;
//   font-family: 'Bebas Neue';

//   & > *:not(:last-child) {
//     margin-right: 0.75rem;
//   }
// `;

const ItemCounter = ({ num }: { num: number }) => (
  <Flex
    align="center"
    justify="center"
    width="22px"
    height="22px"
    bg="black"
    color="white"
    fontSize="1.2rem"
    borderRadius="50%"
  >
    {num}
  </Flex>
);

const Cart = () => {
  return (
    <Button
      height="4rem"
      borderRadius="3rem"
      pr="1rem"
      border="none"
      px="1.6rem"
      fontWeight="400"
      fontFamily="Bebas Neue"
      iconSpacing="1rem"
      fontSize="1.7rem"
      color="white"
      bg="primary.500"
      _hover={{ bg: 'primary.300' }}
      leftIcon={
        <Icon as={CartLogo} viewBox="1rem" fill="white" stroke="white" />
      }
      rightIcon={<ItemCounter num={2} />}
    >
      CART
    </Button>
  );
};

// TODO Get items with redux, show length

export default Cart;
