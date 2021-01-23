import { Button, Center, Icon, useMediaQuery } from '@chakra-ui/react';
import { ReactComponent as CartLogo } from 'assets/shopping-cart.svg';
import React from 'react';
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

const Cart = ({ order }: { order?: number | number[] }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const productNum: number = cart.reduce((acc, curr) => {
    return curr.amount;
  }, 0);

  const [isLargerThanPhone] = useMediaQuery('(min-width:36rem)');

  // TODO Link to Cart or popup

  return (
    <>
      {isLargerThanPhone ? (
        <Button
          order={order}
          flexShrink={0}
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
      ) : (
        <Center order={order} pos="relative">
          <Icon as={CartLogo} w="2rem" h="2rem" fill="white" stroke="white" />
          <Center
            width="1.3rem"
            height="1.3rem"
            borderRadius="50%"
            pos="absolute"
            top="-30%"
            right="-30%"
            bg="primary.500"
            color="white"
          >
            {productNum.toString()}
          </Center>
        </Center>
      )}
    </>
  );
};

export default Cart;
