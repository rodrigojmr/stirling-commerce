import { Button, Center, Icon } from '@chakra-ui/react';
import { ReactComponent as CartLogo } from 'assets/shopping-cart.svg';
import React from 'react';

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
interface CartButtonProps {
  productNum: number;
  order: ChakraOrder;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({
  order,
  productNum,
  onClick
}) => {
  return (
    <Button
      onClick={onClick}
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
  );
};

export default CartButton;
