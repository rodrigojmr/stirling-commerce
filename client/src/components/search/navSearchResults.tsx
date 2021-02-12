import { Box, Flex, Center, Image, Link, Spinner } from '@chakra-ui/react';
import { Product } from '@prisma/client';
import { LayoutProps } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Loading = () => (
  <Center>
    <Spinner />
  </Center>
);

const Result = ({ product }: { product: Product }) => (
  <Link as={RouterLink} to={`/product/${product.id}`}>
    <Flex
      as="li"
      p={3}
      minHeight="9rem"
      align="center"
      transition="all .2s"
      borderBottom="1px solid"
      borderColor="lighter-grey"
      _hover={{ bg: 'light-grey' }}
    >
      <Box flexBasis="8rem" mr={3}>
        <Image
          objectFit="cover"
          fallback={<Loading />}
          src={product.image}
          alt={product.title}
        />
      </Box>
      <Box>{product.title}</Box>
    </Flex>
  </Link>
);

const Results = ({
  products,
  display
}: {
  products: Product[];
  display?: string;
}) => (
  <Box
    display={display || 'initial'}
    pos="absolute"
    bg="white"
    right="0px"
    width="170%"
    zIndex="1"
    border="3px solid primary.500"
    maxH="40rem"
    overflowY="scroll"
    css={{
      '&::-webkit-scrollbar': {
        width: '4px'
      },
      '&::-webkit-scrollbar-track': {
        width: '6px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'grey',
        borderRadius: '24px'
      }
    }}
  >
    {products.map((product: Product, key: number) => (
      <Result key={key} product={product} />
    ))}
  </Box>
);

export default Results;
