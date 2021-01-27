import React, { useRef, useContext, ButtonHTMLAttributes } from 'react';
import { RootState } from 'store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Box,
  Heading,
  Text,
  Grid,
  Image,
  Flex,
  Center,
  IconButton,
  ButtonGroup
} from '@chakra-ui/react';
import { drawerContext } from 'hooks/useDrawer';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { removeProduct } from 'store/slices/cartSlice';

interface Props {
  children?: React.ReactNode;
}

// This component is used as a parent component of any children, like a button, that is to be used to open the drawer.
// Whether the drawer is open or not is set by drawerContext

const CartDrawer = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { isOpen, setDrawer } = useContext(drawerContext);

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
                <Flex key={item.product._id} _notLast={{ marginBottom: 4 }}>
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
                        <PopoverCloseButton />
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
              <Box>Total: €{totalPrice}</Box>
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
