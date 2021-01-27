import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useMediaQuery,
  usePrevious
} from '@chakra-ui/react';
import CartDrawer from 'components/cartDrawer';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import CartButton from './cartButton';
import CartIcon from './cartIcon';

interface Props {
  order: ChakraOrder;
}

const Cart = ({ order }: Props) => {
  const cart = useSelector((state: RootState) => state.cart);
  const [cartChange, setCartChange] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const productNum: number = cart.reduce((acc, curr) => {
    return curr.amount;
  }, 0);

  const prevAmount = usePrevious(productNum);

  useEffect(() => {
    if (prevAmount < productNum) {
      if (!isNotifOpen) {
        setIsNotifOpen(true);
        // setTimeout(() => {
        //   setIsNotifOpen(false);
        // }, 2000);
      }
    }
    setCartChange(!cartChange);
  }, [cart]);

  const [isLargerThan1280px] = useMediaQuery('(min-width:80rem)');
  console.log([cartChange]);
  // TODO Link to Cart or popup

  // onClick prop is added so typescript doesn't error, cartDrawer will clone the element with the proper function to set the drawer to open
  const SelectedCart = isLargerThan1280px ? (
    <CartButton onClick={() => {}} order={order} productNum={productNum} />
  ) : (
    <CartIcon onClick={() => {}} order={order} productNum={productNum} />
  );

  return (
    <>
      <CartDrawer>{SelectedCart}</CartDrawer>
    </>
  );
};

export default Cart;
