import { Box, Button, Flex, Input, Text, Select } from '@chakra-ui/react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import CardSection from 'components/stripe/cardSection';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { RootState } from 'store/rootReducer';
import { emptyCart } from 'store/slices/cartSlice';
import api from 'utils/api';

export const CheckoutForm = ({
  stripe,
  elements
}: {
  stripe: Stripe | null;
  elements: StripeElements | null;
}) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [error, setError] = useState('');
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);
  const history = useHistory();

  const { handleSubmit, errors, register, formState } = useForm();

  const onSubmit = async (values: any) => {
    if (!isSubmitBlocked) {
      if (!stripe || !elements) {
        return;
      }
      setIsSubmitBlocked(true);
      const card = elements.getElement(CardElement);
      const result = card && (await stripe.createToken(card));

      if (result?.error?.message) {
        setError(result.error.message);
      } else if (result?.token) {
        const order = {
          products: cart,
          cardToken: result?.token
        };
        try {
          const res = await api.orders.submitOrder(order);
          const orderId = res.data.id;
          dispatch(emptyCart());
          history.push(`/order/${orderId.toString()}`);
        } catch (error) {
          setError(error.message);
          setIsSubmitBlocked(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        required
        fontFamily="body"
        name="name"
        placeholder="Full Name"
        mb={2}
      />
      <Input
        required
        fontFamily="body"
        name="address"
        placeholder="Address"
        mb={2}
        minLength={10}
      />
      <Flex
        flexWrap="wrap"
        sx={{
          '& > *:not(:last-child)': {
            marginRight: 2
          }
        }}
      >
        <Input
          required
          flex="1 1 0"
          fontFamily="body"
          name="city"
          placeholder="City"
          minLength={3}
        />
        <Input
          // ref={register({
          //   pattern: /^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$/
          // })}
          required
          flex="1 1 0"
          fontFamily="body"
          name="zip"
          placeholder="Zip Code"
          inputMode="numeric"
        />
        <Select
          required
          flex="1 1 0"
          fontFamily="body"
          name="country"
          placeholder="Country"
          _placeholder={{ color: 'gray.400' }}
          minLength={3}
          sx={{ 'option:first-of-type': { color: 'gray.300' } }}
        >
          <option value="portugal">Portugal</option>
          <option value="spain">Spain</option>
          <option value="france">France</option>
          <option value="portugal">Portugal</option>
          <option value="germany">Germany</option>
          <option value="italy">Italy</option>
        </Select>
      </Flex>
      <Box
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        p={2}
        my={4}
      >
        <CardSection />
      </Box>
      <Flex align="center">
        <Button isDisabled={isSubmitBlocked} type="submit">
          Buy Now
        </Button>
        {error && <Text px={2}>{error}</Text>}
      </Flex>
    </form>
  );
};

export const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
};
