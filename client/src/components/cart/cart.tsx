import { useMediaQuery, usePrevious } from '@chakra-ui/react';
import CartDrawer from 'components/cartDrawer';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

  // TODO Link to Cart or popup
  const [notifTop, setNotifTop] = useState<number | undefined>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    function updatePosition() {
      setNotifTop(buttonRef?.current?.getBoundingClientRect().bottom);
    }

    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
  }, []);
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
        {SelectedButton}
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
