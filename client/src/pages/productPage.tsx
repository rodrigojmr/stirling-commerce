import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Select,
  Skeleton,
  SkeletonText,
  Text
} from '@chakra-ui/react';
import { drawerContext } from 'hooks/useDrawer';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link as RouterLink,
  RouteComponentProps,
  useParams
} from 'react-router-dom';
import { RootState } from 'store/rootReducer';
import { addProduct } from 'store/slices/cartSlice';
import { requestProduct } from 'store/slices/productDetailsSlice';
import { getProductAverageReviews } from 'utils';
import { stars } from '../components/styled/Stars';

const SingleProduct = ({ match }: RouteComponentProps) => {
  // Get Product
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProduct(id));
  }, [id]);

  const [imageLoaded, setImageLoaded] = useState(false);

  const { product, error, status } = useSelector(
    (state: RootState) => state.productDetails
  );
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);

  const [amount, setAmount] = useState('1');

  const { isOpen, setDrawer } = useContext(drawerContext);

  const updateCart = () => {
    if (product && user) {
      setDrawer(true);
      dispatch(addProduct({ amount: parseInt(amount), product }));
    }
  };

  const numReviews =
    product && product.reviews.length > 1
      ? `${product?.reviews.length} customer reviews`
      : '1 customer review';

  const cartItem = cart?.find(item => item.product.id === product?.id);

  const inCartIsMoreThanStock = (): boolean => {
    if (cartItem && product) {
      return cartItem.amount >= product?.stock;
    } else return false;
  };

  const stockText =
    product && product?.stock > 0
      ? `In Stock:
  ${product.stock}`
      : 'Not in stock.';

  return (
    <>
      <Box py={{ base: 10, md: 20 }} px="clamp(6rem, 5vw, 10rem)">
        <Box mb={6}>
          <Breadcrumb color="gray.500" _hover={{ color: 'gray.700' }}>
            {product?.categories?.map((category, i, categoriesArray) => {
              const urlString = categoriesArray
                .slice(0, i + 1)
                .reduce((string, category) => {
                  return string + '/' + category.name.toLowerCase();
                }, '/search');
              // const urlString = '#';
              return (
                <BreadcrumbItem key={i}>
                  <BreadcrumbLink as={RouterLink} to={urlString}>
                    {category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </Box>
        <Flex
          flexDir={{ base: 'column', xl: 'row' }}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          margin="0 auto"
          maxWidth="max"
        >
          <Center
            width="100%"
            minHeight={{ base: '20rem', xl: '30rem' }}
            flexBasis="48%"
          >
            <Skeleton
              minHeight={{ base: '20rem' }}
              width="100%"
              borderRadius={8}
              isLoaded={status === 'succeeded' && imageLoaded}
            >
              <Image
                onLoad={() => setImageLoaded(true)}
                objectFit="cover"
                src={product?.image}
                alt={product?.title}
              />
            </Skeleton>
          </Center>
          <Flex
            flexBasis="45%"
            direction="column"
            gridColumn="col-start 5 / col-end 7"
          >
            <Skeleton
              borderRadius={8}
              minH={6}
              isLoaded={status === 'succeeded'}
              mb={4}
            >
              <Heading as="h1" fontSize="3xl" fontFamily="body">
                {product?.title}
              </Heading>
            </Skeleton>
            {product && status === 'succeeded' ? (
              <Flex align="center">
                {stars(getProductAverageReviews(product))}
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
            ) : (
              <Skeleton height={4} mb={4} />
            )}
            <SkeletonText
              noOfLines={1}
              maxW="30%"
              mb={4}
              minH={2}
              isLoaded={status === 'succeeded'}
            >
              <Text color="gray.600" fontSize="2xl" fontWeight={'600'}>
                €{product?.price}
              </Text>
            </SkeletonText>
            <SkeletonText
              noOfLines={8}
              spacing="4"
              mb={4}
              isLoaded={status === 'succeeded'}
            >
              <Text fontSize="lg" mb={2}>
                {product?.description}
              </Text>
              <Text color="grey">{stockText}</Text>
            </SkeletonText>
            {/* TODO Split to separate component */}
            <Skeleton isLoaded={status === 'succeeded'}>
              <form>
                <Flex>
                  <label htmlFor="amount-input"></label>
                  <Select
                    as="select"
                    w="5rem"
                    border="1px solid black"
                    borderRadius="5px"
                    mr={4}
                    height="3rem"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    fontSize="xl"
                    color="grey.500"
                    name="amount"
                    id="amount-input"
                  >
                    {product &&
                      [...Array(product?.stock).keys()].map(x => (
                        <option
                          disabled={
                            x + 1 + (cartItem?.amount || 0) > product?.stock
                          }
                          key={x}
                          value={x + 1}
                        >
                          {x + 1}
                        </option>
                      ))}
                  </Select>
                  <Button
                    _hover={{ _disabled: { bg: 'primary.400' } }}
                    disabled={inCartIsMoreThanStock() || !user}
                    onClick={updateCart}
                    fontSize="1.3rem"
                    size="lg"
                    variant="primary"
                  >
                    Add to cart
                  </Button>
                </Flex>
              </form>
            </Skeleton>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default SingleProduct;
