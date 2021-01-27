import { Center, Icon } from '@chakra-ui/react';
import { ReactComponent as CartLogo } from 'assets/shopping-cart.svg';
import React from 'react';

interface cartIconProps {
  productNum: number;
  order: ChakraOrder;
  onClick: () => void;
}

const CartIcon: React.FC<cartIconProps> = ({ order, productNum, onClick }) => {
  return (
    <Center onClick={onClick} order={order} pos="relative">
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
  );
};

export default CartIcon;
