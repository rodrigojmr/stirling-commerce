import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { allProducts } from '../../data/products';
import Results from './navSearchResults';

const StyledForm = styled.form<{ order?: number }>`
  position: relative;
  max-width: 25rem;
  width: 100%;
  margin-left: auto;
  margin-right: 2rem;
  font-size: 2rem;
  order: ${({ order }) => order}; ;
`;

//TODO Separate search concern from UI
interface Props {
  order: ChakraOrder;
}
const Search = ({ order }: Props) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState({ message: '' });

  const [toggled, setToggled] = useState(false);

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setToggled(!toggled);
  };

  // TODO Change form to Box
  return (
    <Box
      pos="relative"
      maxWidth={['2.4rem', '25rem']}
      ml={['auto']}
      mr={[4, 8]}
      fontSize={['xl']}
      order={order}
    >
      <form>
        <InputGroup>
          <Input
            width={{ base: toggled ? 10 : 0, xl: 'initial' }}
            paddingBottom={2}
            variant="unstyled"
            lineHeight="3"
            borderBottomRadius="0"
            fontSize="xl"
            borderBottom={{
              base: toggled ? '1px solid grey' : 'none',
              md: '1px solid grey'
            }}
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
            top={{ base: '-5px' }}
            children={
              <IconButton
                maxH="2rem"
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                bg="transparent"
                onClick={handleButtonClick}
                aria-label="Search or Toggle Search"
                icon={
                  <SearchIcon
                    width={'1.5rem'}
                    height={'1.5rem'}
                    stroke="white"
                  />
                }
              ></IconButton>
              // <StyledIcon />
            }
          />
        </InputGroup>
        {query && filteredProducts.length > 0 && (
          <Results products={filteredProducts} />
        )}
      </form>
    </Box>
  );
};

export default Search;
