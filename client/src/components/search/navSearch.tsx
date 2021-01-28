import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { useState, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
interface Props extends RouteComponentProps {
  order: ChakraOrder;
}
const Search: React.FC<Props> = ({ order, history }) => {
  const [query, setQuery] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [error, setError] = useState({ message: '' });

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (toggled) {
      setQuery('');
      setToggled(false);
      if (inputRef.current) inputRef.current.blur();
    } else {
      setToggled(true);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  history.listen((location, action) => {
    setQuery('');
  });

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
            ref={inputRef}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            maxWidth={{ base: toggled ? 64 : 0, xl: 'initial' }}
            paddingBottom={2}
            variant="unstyled"
            lineHeight="3"
            borderBottomRadius="0"
            fontSize="xl"
            borderBottom={{
              base: toggled ? '1px solid grey' : 'none'
            }}
            focusBorderColor="primary.500"
            errorBorderColor="red"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="search"
            color="white"
            backgroundColor="transparent"
            transition="all .3s ease-out"
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
        {searchFocus && query && filteredProducts.length > 0 && (
          <Results products={filteredProducts} />
        )}
      </form>
    </Box>
  );
};

export default withRouter(Search);
