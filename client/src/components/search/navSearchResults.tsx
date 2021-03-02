import { Box, Center, Flex, Image, Link, Spinner } from '@chakra-ui/react';
import { IProduct } from '@shared/types';
import { Link as RouterLink } from 'react-router-dom';

const Result = ({ product }: { product: IProduct }) => (
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
          fallback={
            <Center>
              <Spinner />
            </Center>
          }
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
  products: IProduct[];
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
    {products.map((product: IProduct, key: number) => (
      <Result key={key} product={product} />
    ))}
  </Box>
);

export default Results;
