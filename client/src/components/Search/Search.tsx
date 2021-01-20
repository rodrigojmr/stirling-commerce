import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { useState } from 'react';
import { allProducts } from '../../data/products';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import Results from './SearchResults';

const StyledForm = styled.form`
  position: relative;
  width: 25rem;
  margin-left: auto;
  margin-right: 4rem;
  font-size: 2rem;
`;

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  stroke: white;
  width: 1.75rem;
  height: 1.75rem;
`;

const Search = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState({ message: '' });

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <StyledForm>
      <Input
        variant="flushed"
        focusBorderColor="primary.500"
        errorBorderColor="red"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="search"
        color="white"
        backgroundColor="transparent"
      />
      <StyledIcon />
      {query && filteredProducts.length > 0 && (
        <Results products={filteredProducts} />
      )}
    </StyledForm>
  );
};

export default Search;
