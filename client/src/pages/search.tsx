import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { IProduct } from '@shared/types';
import ProductCard from 'components/products/productCard';
import { categories, types } from 'data/data';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { RootState } from 'store/rootReducer';
import { requestProducts } from 'store/slices/catalogSlice';

// Brands will be the first parameter

const Search = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const params = useParams<{
    category: string;
    type1: string;
    type2: string;
  }>();

  useEffect(() => {
    dispatch(requestProducts());
  }, []);

  const { products, status } = useSelector((state: RootState) => state.catalog);

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>();

  // Filter products
  useEffect(() => {
    const filtered = products?.filter(product => {
      const { categories } = product;
      const conditions: boolean[] = [];
      // Go through each of the directory's params and check if the product has the category
      Object.values(params).forEach(param => {
        const check = param
          ? categories.some(cat => cat.name.toLowerCase().includes(param))
          : true;
        conditions.push(check);
      });
      // Only return true when all conditions are true
      return conditions.every(condition => condition === true);
    });

    setFilteredProducts(filtered);
  }, [products, params]);
  console.log('params: ', params);

  const setCategory = (cat?: string) => {
    const directory = `/search${cat ? `/${cat}` : ``}`;
    history.push(directory);
  };

  const categoriesWithClothing = ['men', 'women', 'kids'];
  const isCategoryWithClothing = categoriesWithClothing.some(
    categoryWithClothing => categoryWithClothing === params.category
  );

  const setClothing = (param: string) => {
    const clothingType = `${param ? `/${param}` : ''}`;
    const category = isCategoryWithClothing
      ? `/${params.category}`
      : '/clothing';
    history.push(`/search${category}${clothingType}`);
  };

  // const filteredProducts = products?.filter(product => product.title.)

  return (
    <>
      <Center my={8}>
        <Heading>Products</Heading>
      </Center>
      <Grid
        mx={9}
        my={8}
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
        <Box
          p={8}
          gridArea="sidebar"
          as="aside"
          borderRadius="2xl"
          bg="gray.200"
        >
          {/* Categories */}
          <Button
            justifySelf="left"
            variant="link"
            color="black"
            onClick={e => history.push('/search')}
            fontSize="2xl"
            mb={4}
          >
            All
          </Button>
          <VStack align="flex-start" mb={8}>
            <Button
              justifySelf="left"
              variant="link"
              color="black"
              onClick={e => setCategory('')}
              fontSize="2xl"
              mb={2}
            >
              Categories
            </Button>
            {categories.map((cat, i) => (
              <Button
                color={
                  Object.values(params).includes(cat) ? 'black' : `gray.600`
                }
                _hover={{ color: 'black' }}
                variant="link"
                key={i}
                onClick={e => setCategory(cat)}
                fontSize="xl"
              >
                {cat[0].toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </VStack>
          {/* Clothing */}
          {isCategoryWithClothing && (
            <VStack align="flex-start" mb={8}>
              <Button
                justifySelf="left"
                variant="link"
                color="black"
                onClick={e => setClothing('')}
                fontSize="2xl"
                mb={2}
              >
                Clothing
              </Button>
              {types.clothing.map((cat, i) => (
                <Button
                  color={
                    Object.values(params).includes(cat) ? 'black' : `gray.600`
                  }
                  _hover={{ color: 'black' }}
                  variant="link"
                  key={i}
                  onClick={e => setClothing(cat)}
                  fontSize="xl"
                >
                  {cat[0].toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </VStack>
          )}
        </Box>
        {/* Products */}
        <Grid
          justifyContent="center"
          gridArea="results"
          gridGap={3}
          gap={3}
          templateColumns={{
            base: 'repeat(auto-fit, minmax(16rem, 1fr))',
            xl: 'repeat(auto-fit, 20rem)'
          }}
        >
          <>
            {status === 'loading' ? (
              <>
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
                <Skeleton height="20rem" />
              </>
            ) : (
              <>
                {filteredProducts && filteredProducts?.length > 0 ? (
                  filteredProducts?.map((product, key) => (
                    <ProductCard product={product} key={key} />
                  ))
                ) : (
                  <Text>No products match your search.</Text>
                )}
              </>
            )}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
