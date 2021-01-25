import { Box, Heading, Button, Flex, Text, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { addProduct } from 'features/cart/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { StyledInput } from '../components/styled';
import { stars } from '../components/styled/Stars';
import { allProducts } from '../data/products';
import theme from '../theme/theme';

const ImgWrapper = styled.div`
  grid-column: center-start / col-end 3;
  img {
    object-fit: cover;
    max-width: 100%;
    max-height: auto;
  }
`;

const NumInput = styled(StyledInput)`
  width: 6rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  margin-right: 1.5rem;
`;

const SingleProduct = ({ match }: RouteComponentProps) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState('1');

  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(
      allProducts.find((product): product is Product => product._id === id)
    );
  }, [id]);

  const updateCart = () => {
    if (product) dispatch(addProduct({ amount: parseInt(amount), product }));
  };

  const numReviews =
    product && product.numReviews > 1
      ? `${product?.numReviews} customer reviews`
      : '1 customer review';

  return (
    <>
      {product ? (
        <Box
          sx={{
            display: 'grid',
            padding: '6rem 0',
            gridTemplateColumns:
              '[full-start] minmax(12rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 12rem) [col-end])[center-end] minmax(12rem, 1fr) [full-end]',
            alignItems: 'center'
          }}
        >
          <ImgWrapper>
            <img src={product?.image} alt={product?.title} />
          </ImgWrapper>
          <Flex direction="column" gridColumn="col-start 5 / col-end 7">
            <Heading mb={4} as="h1" fontSize="3xl" fontFamily="body">
              {product.title}
            </Heading>
            <Flex align="center">
              {stars(product.rating)}
              <Text
                ml="12px"
                fontSize="lg"
                color="primary"
                css={`
                  margin-right: 10px;
                `}
              >
                ({numReviews})
              </Text>
            </Flex>
            <Text color="primary" fontSize="2xl" fontWeight={600} mb={4}>
              €{product.price}
            </Text>
            <Text fontSize="lg" mb={4}>
              {product.description}
            </Text>
            {/* TODO Split to separate component */}
            <form>
              <Flex>
                <label htmlFor="amount-input"></label>
                <Input
                  w="4rem"
                  border="1px solid black"
                  borderRadius="5px"
                  py={3}
                  px={4}
                  mr={4}
                  height="3rem"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min={1}
                  fontSize="xl"
                  color={theme.colors.grey}
                  type="number"
                  name="amount"
                  id="amount-input"
                />
                <Button
                  onClick={updateCart}
                  fontSize="1.3rem"
                  size="lg"
                  variant="primary"
                >
                  Add to cart
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      ) : null}
    </>
  );
};

export default SingleProduct;
