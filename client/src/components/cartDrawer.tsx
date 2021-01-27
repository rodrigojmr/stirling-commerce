import React, { useRef, useContext, ButtonHTMLAttributes } from 'react';
import { RootState } from 'store/rootReducer';
import { useSelector } from 'react-redux';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Heading,
  Text
} from '@chakra-ui/react';
import { drawerContext } from 'hooks/useDrawer';

interface Props {
  children?: React.ReactNode;
}

const CartDrawer = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const cart = useSelector((state: RootState) => state.cart);

  const { isOpen, setDrawer } = useContext(drawerContext);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: () => setDrawer(true) });
    }
    return child;
  });

  // <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
  //   Open
  // </Button>
  return (
    <>
      {childrenWithProps}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => setDrawer(false)}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent bg="dark-grey" color="white">
            <DrawerCloseButton />
            <DrawerHeader>Cart</DrawerHeader>

            <DrawerBody>
              {cart.map(item => (
                <Box>
                  <Heading>{item.product.title}</Heading>
                  <Text>{item.amount}</Text>
                </Box>
              ))}
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                colorScheme="teal"
                mr={3}
                onClose={() => setDrawer(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="teal">Check Out</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

export default CartDrawer;
