import {
  Box,
  Center,
  Container,
  Grid,
  Heading,
  VStack
} from '@chakra-ui/react';
import ProductCard from 'components/products/productCard';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RootState } from 'store/rootReducer';

interface MatchParams {
  param1: string;
  param2: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

// Brands will be the first parameter

const Search = ({ match }: Props) => {
  const { param1, param2 } = match.params;
  const products = useSelector((state: RootState) => state.products.products);

  // TODO Change from JSON to database
  // const filteredProducts = products?.filter(product => product.title.)

  return (
    <>
      <Center my={8}>
        <Heading>Products</Heading>
      </Center>
      <Grid
        mx={9}
        templateColumns={{
          base: '1fr',
          xl: '1fr 4fr'
        }}
        gridTemplateAreas={{
          base: '"sidebar" "results"',
          xl: '"sidebar results"'
        }}
        gridGap={4}
      >
        <Box gridArea="sidebar" as="aside" bg="yellow.100">
          <VStack>Categories</VStack>
          <VStack>Relevance</VStack>
        </Box>
        {/* Products */}
        <Grid
          gridArea="results"
          gridGap={3}
          gap={3}
          templateColumns={{
            base: 'repeat(auto-fit, minmax(18rem, 1fr))'
          }}
        >
          <>
            {products?.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
