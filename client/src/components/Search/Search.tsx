import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { useState } from 'react';
import { allProducts } from '../../data/products';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import Results from './SearchResults';

const StyledForm = styled.form`
  position: relative;
  max-width: 30rem;
  width: 100%;
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
      <InputGroup>
        <Input
          paddingBottom=".3rem"
          variant="unstyled"
          lineHeight="3"
          borderBottomRadius="0"
          fontSize={4}
          borderBottom="1px solid grey"
          focusBorderColor="primary.500"
          errorBorderColor="red"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search"
          color="white"
          backgroundColor="transparent"
          _focus={{
            borderColor: 'primary.500'
          }}
        />
        <InputRightElement
          top="-2px"
          children={
            <Icon as={SearchIcon} boxSize="1.75rem" stroke="white" />
            // <StyledIcon />
          }
        />
      </InputGroup>
      {query && filteredProducts.length > 0 && (
        <Results products={filteredProducts} />
      )}
    </StyledForm>
  );
};

export default Search;
