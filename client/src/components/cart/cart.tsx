import { Box, useMediaQuery, usePrevious } from '@chakra-ui/react';
import CartDrawer from 'components/cart/cartDrawer';
import React, { useEffect, useRef, useState } from 'react';
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
    return acc + curr.amount;
  }, 0);

  const prevAmount = usePrevious(productNum);

  useEffect(() => {
    if (prevAmount < productNum) {
      if (!isNotifOpen) {
        setIsNotifOpen(true);
      }
    }
    setCartChange(!cartChange);
  }, [cart, isNotifOpen, prevAmount, productNum]);

  // TODO Link to Cart or popup
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Was going to be used alongside CartNotif to programatically update the position of the notification

  // const [notifTop, setNotifTop] = useState<number | undefined>(0);
  // useLayoutEffect(() => {
  //   function updatePosition() {
  //     setNotifTop(buttonRef?.current?.getBoundingClientRect().bottom);
  //   }

  //   window.addEventListener('resize', updatePosition);
  //   updatePosition();
  //   return () => window.removeEventListener('resize', updatePosition);
  // }, []);

  const [isLargerThan1280px] = useMediaQuery('(min-width:80rem)');

  const SelectedButton = isLargerThan1280px ? (
    // onClick prop is added so typescript doesn't error, cartDrawer will clone the element with the proper function to set the drawer to open
    <CartButton ref={buttonRef} onClick={() => {}} productNum={productNum} />
  ) : (
    <CartIcon ref={buttonRef} onClick={() => {}} productNum={productNum} />
  );

  return (
    <>
      <CartDrawer>
        <Box order={order}>{SelectedButton}</Box>
        {/* Not using notif popup
        <Box order={order} pos="relative">
          <CartNotif isOpen={isNotifOpen} setIsOpen={setIsNotifOpen}>
          </CartNotif>
        </Box> */}
      </CartDrawer>
    </>
  );
};

export default Cart;
