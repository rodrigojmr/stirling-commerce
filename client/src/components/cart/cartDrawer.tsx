import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react';
import { drawerContext } from 'hooks/useDrawer';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { removeProduct } from 'store/slices/cartSlice';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

// This component is used as a parent component of any children, like a button, that is to be used to open the drawer.
// Whether the drawer is open or not is set by drawerContext

const CartDrawer = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { isOpen, setDrawer } = useContext(drawerContext);

  // TODO Decide reset every location change?
  const location = useLocation();
  useEffect(() => {
    setDrawer(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!cart.length) {
      setDrawer(false);
    }
  }, [cart]);

  const btnRef = useRef<HTMLButtonElement>(null);

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: () => setDrawer(true) });
    }
    return child;
  });

  const totalPrice = cart?.reduce((acc, current, arr) => {
    // Round to two decimal places
    return acc + Math.round(current.product.price * current.amount * 100) / 100;
  }, 0);

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
                <Flex key={item.product.id} _notLast={{ marginBottom: 4 }}>
                  <Box flexBasis="30%" mr={[4]}>
                    <Image alt={item.product.title} src={item.product.image} />
                  </Box>
                  <Box>
                    <Heading fontSize={[20]}>{item.product.title}</Heading>
                    <Text>{item.amount}</Text>
                    <Text>
                      €{(item.product.price * item.amount).toFixed(2)}
                    </Text>
                  </Box>
                  <Box ml="auto">
                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          _hover={{ bg: 'primary.400' }}
                          bg="transparent"
                          size="s"
                          aria-label="Remove product from cart"
                          icon={<SmallCloseIcon w={[6]} h={[6]} />}
                        />
                      </PopoverTrigger>
                      <PopoverContent bg="dark-grey">
                        <PopoverArrow />
                        <PopoverBody>
                          <Text mb=".5rem">Remove item from the cart?</Text>
                          <Button
                            size="sm"
                            colorScheme="teal"
                            onClick={() =>
                              dispatch(removeProduct(item.product))
                            }
                          >
                            Remove
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>
              ))}
            </DrawerBody>

            <DrawerFooter>
              <Box mr="auto">Total: €{totalPrice.toFixed(2)}</Box>
              <Button
                variant="outline"
                colorScheme="teal"
                mr={3}
                onClick={() => setDrawer(false)}
              >
                Cancel
              </Button>
              <Button as={RouterLink} to="/checkout" colorScheme="teal">
                Check Out
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

export default CartDrawer;
