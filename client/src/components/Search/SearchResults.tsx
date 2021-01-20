import { Box, Image, Flex, styled, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Result = ({ product }: { product: Product }) => (
  <Link as={RouterLink} to={`/product/${product._id}`}>
    <Flex
      as="li"
      p={3}
      align="center"
      transition="all .2s"
      borderBottom="1px solid light-grey"
      _hover={{ bg: 'light-grey' }}
    >
      <Box flexBasis="8rem" mr={3}>
        <Image objectFit="cover" src={product.image} alt={product.title} />
      </Box>
      <Box>{product.title}</Box>
    </Flex>
  </Link>
);

const Results = ({ products }: { products: Product[] }) => (
  <Box
    pos="absolute"
    bg="white"
    right="0"
    width="150%"
    zIndex="1"
    border="3px solid primary.500"
    maxH="50rem"
    overflowY="scroll"
  >
    {products.map((product: Product) => (
      <Result product={product} />
    ))}
  </Box>
);

export default Results;
