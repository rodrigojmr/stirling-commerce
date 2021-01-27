import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Text,
  Image
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { drawerContext } from 'hooks/useDrawer';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { addProduct } from 'store/slices/cartSlice';
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
  const { isOpen, setDrawer } = useContext(drawerContext);

  useEffect(() => {
    setProduct(
      allProducts.find((product): product is Product => product._id === id)
    );
  }, [id]);

  const updateCart = () => {
    if (product) {
      setDrawer(true);
      setTimeout(() => {
        dispatch(addProduct({ amount: parseInt(amount), product }));
      }, 600);
    }
  };

  const numReviews =
    product && product.numReviews > 1
      ? `${product?.numReviews} customer reviews`
      : '1 customer review';

  return (
    <>
      {product ? (
        <Flex
          width="100%"
          alignItems="center"
          py={24}
          px="clamp(6rem, 5vw, 10rem)"
          justifyContent="space-between"
          margin="0 auto"
          maxWidth="max"
        >
          <Box flexBasis="45%">
            <Image
              objectFit="cover"
              src={product?.image}
              alt={product?.title}
            />
          </Box>
          <Flex
            flexBasis="45%"
            direction="column"
            gridColumn="col-start 5 / col-end 7"
          >
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
                <Select
                  as="select"
                  w="4rem"
                  border="1px solid black"
                  borderRadius="5px"
                  mr={4}
                  height="3rem"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  fontSize="xl"
                  color={theme.colors.grey}
                  name="amount"
                  id="amount-input"
                >
                  {[...Array(product.stock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Select>
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
        </Flex>
      ) : null}
    </>
  );
};

export default SingleProduct;
