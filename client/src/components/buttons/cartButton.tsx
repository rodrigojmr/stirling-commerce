import { Button, Center, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { ReactComponent as CartLogo } from 'assets/shopping-cart.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

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

const ItemCounter = ({ num }: { num: string }) => (
  <Center
    justify="center"
    minW="1.7em"
    p="5px"
    bg="black"
    color="white"
    fontSize="1.2rem"
    borderRadius="50%"
  >
    {num.toString()}
  </Center>
);

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const productNum: number = cart.reduce((acc, curr) => {
    return curr.amount;
  }, 0);

  return (
    <Button
      height="2.5rem"
      borderRadius="3rem"
      pr={4}
      border="none"
      px={6}
      fontWeight="400"
      fontFamily="Bebas Neue"
      iconSpacing={4}
      fontSize="xl"
      color="white"
      bg="primary.500"
      _hover={{ bg: 'primary.300' }}
      leftIcon={
        <Icon as={CartLogo} viewBox="1rem" fill="white" stroke="white" />
      }
      rightIcon={<ItemCounter num={productNum.toString()} />}
    >
      CART
    </Button>
  );
};

// TODO Get items with redux, show length

export default Cart;
