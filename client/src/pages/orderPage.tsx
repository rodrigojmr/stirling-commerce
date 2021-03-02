import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { SingleOrderPayload } from '@shared/types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import api from 'utils/api';

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<SingleOrderPayload | null>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.orders.fetchOrder(id);
        setOrder(res.data);
      } catch (error) {}
    };
    fetchProduct();
  }, [id]);

  return (
    <Center flexDir="column" bg="light-grey" py={20}>
      <Skeleton minH={4} isLoaded={!!order}>
        <Heading>Your Order #{order?.id}</Heading>
      </Skeleton>
      <Skeleton isLoaded={!!order}>
        <Box
          minWidth={{ base: 'initial', md: '35rem' }}
          as="article"
          mt={4}
          borderRadius="xl"
          bg="white"
          px={8}
          py={12}
          pb={8}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="xl">Product</Th>
                <Th fontSize="xl">Amount</Th>
                <Th fontSize="xl">Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order?.products.map(({ amount, product }, i) => (
                <Tr key={i}>
                  <Td maxW="8rem" textAlign="center">
                    <Link as={RouterLink} to={`/products/${product.id}`}>
                      <Image
                        margin="0 auto"
                        src={product.image}
                        alt={product.title}
                        boxSize="100px"
                        objectFit="cover"
                      />
                      <Heading mt={4} as="h3" fontFamily="body" fontSize="sm">
                        {product.title}
                      </Heading>
                    </Link>
                  </Td>
                  <Td isNumeric textAlign="center">
                    {amount}
                  </Td>
                  <Td isNumeric>€{(amount * product.price) / 100}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th textAlign="right" fontSize="xl">
                  <Heading as="h5" fontSize="xl">
                    Total
                  </Heading>
                  <Text mt={2} color="gray.600">
                    {order ? order.cost / 100 : ''}
                  </Text>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Skeleton>
    </Center>
  );
};

export default OrderPage;
