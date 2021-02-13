import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Link,
  Select,
  SystemStyleObject,
  Text
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Product } from '@prisma/client';
import CartRow from 'components/cart/cartRow';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { RootState } from 'store/rootReducer';
import { CartProduct, setProductAmount } from 'store/slices/cartSlice';
import { CustomTheme } from 'theme/theme';

interface CheckoutProps {}

const inputStyle: SystemStyleObject = { width: '2.5rem' };

const TrashButton = styled(IconButton)`
  svg {
    transition: stroke 0.3s;
  }
  &:hover svg {
    stroke: ${CustomTheme.colors.primary[500]};
  }
`;

const Checkout = ({}: CheckoutProps) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const onAmountChange = (product: Product, amount: number) => {
    const matchingProduct = cart.find(item => item.product.id === product.id);
    if (matchingProduct?.amount !== amount && amount > 0) {
      dispatch(setProductAmount({ product, amount }));
    }
  };

  const productTotal = ({ product, amount }: CartProduct) =>
    (amount * product.price).toFixed(2);

  return (
    <Grid
      py={20}
      mx={{ base: 5, md: '10vw' }}
      templateColumns={{
        base: '1fr',
        xl: '5fr 3fr'
      }}
      gridTemplateAreas={{
        base: '"cart" "shipping"',
        xl: '"cart shipping"'
      }}
      gridGap={4}
    >
      <Box gridArea="cart">
        <Flex
          pb={4}
          align="center"
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <Link
            to="/"
            as={RouterLink}
            fontSize={{ base: '2xl' }}
            color="gray.700"
          >
            <Icon w={6} h={6} mr={2} as={ArrowBackIcon} />
            Continue Shopping
          </Link>
        </Flex>
        <Box my={6}>
          <Heading fontSize="3xl">Shopping Cart</Heading>
          <Flex justify="space-between">
            <Text>You have # items in your cart.</Text>
            <Flex>
              <Text>Sort by:</Text>
              <Select width="initial" border="none" fontSize="md">
                <option value="price">Price</option>
              </Select>
            </Flex>
          </Flex>
          {/* Cart */}
          <Box py={8}>
            {cart?.map((cartItem, key) => (
              <CartRow key={key} item={cartItem} />
            ))}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Checkout;
