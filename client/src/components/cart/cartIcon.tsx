import { Icon, IconButton } from '@chakra-ui/react';
import { ReactComponent as CartLogo } from 'assets/shopping-cart.svg';
import React from 'react';

const CartIcon = React.forwardRef<HTMLButtonElement | null, CartProps>(
  (props, ref) => {
    const { productNum, onClick } = props;
    return (
      <IconButton
        ref={ref}
        bg="transparent"
        boder="none"
        _hover={{ bg: 'transparent', color: 'primary.500' }}
        onClick={onClick}
        pos="relative"
        aria-label="Toggle cart"
        icon={
          <Icon as={CartLogo} w="2rem" h="2rem" fill="white" stroke="white" />
        }
        _before={{
          content: `"${productNum.toString()}"`,
          pos: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1.3rem',
          height: '1.3rem',
          borderRadius: '50%',
          top: '-30%',
          right: '-30%',
          bg: 'primary.500',
          color: 'white'
        }}
      />
    );
  }
);

export default CartIcon;
