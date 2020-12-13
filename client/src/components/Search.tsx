import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';
import { StyledInput } from './styled';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { allProducts } from '../data/products';
import FormInput from './Form/FormInput';

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

// TODO Refactor
const ResultsContainer = styled.ul`
  position: absolute;
  background-color: white;
  right: 0;
  width: 150%;
  z-index: 1;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const StyledResult = styled.li`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  font-family: 'Bebas Neue';
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const Results = ({ products }: { products: Product[] }) => (
  <ResultsContainer>
    {products.map((product: Product) => (
      <Result product={product} />
    ))}
  </ResultsContainer>
);

const Result = ({ product }: { product: Product }) => (
  <StyledResult>
    <div style={{ flex: '0 0 8rem', marginRight: '1rem' }}>
      <img
        style={{ width: '100%', objectFit: 'cover' }}
        src={product.image}
        alt={product.title}
      />
    </div>
    <div>{product.title}</div>
  </StyledResult>
);

const Search = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState({ message: '' });

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <StyledForm>
      <StyledInput
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="search"
        color="white"
        backgroundColor={theme.colors.darkGrey}
      />
      <StyledIcon />
      {query && <Results products={filteredProducts} />}
    </StyledForm>
  );
};

export default Search;
