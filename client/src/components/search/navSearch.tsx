import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from 'store/rootReducer';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
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
  const products = useSelector((state: RootState) => state.catalog.products);

  const [query, setQuery] = useState('');
  const [display, setDisplay] = useState('');
  const [toggled, setToggled] = useState(false);
  const [error, setError] = useState({ message: '' });

  const filteredProducts =
    products?.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    ) || [];

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
      maxWidth={['2.4rem', '20rem']}
      ml={{ base: '1rem', lg: 'auto' }}
      mr={{ base: 'auto', lg: '1rem' }}
      // mr={[4, 8]}
      fontSize={['xl']}
      order={order}
    >
      <form>
        <InputGroup>
          <Input
            ref={inputRef}
            onFocus={() => setDisplay('block')}
            onBlur={e => {
              // If not clicking on a link like a search result
              setDisplay('none');
            }}
            maxWidth={{ base: toggled ? 64 : 0, xl: 'initial' }}
            paddingBottom={2}
            variant="unstyled"
            lineHeight="3"
            borderBottomRadius="0"
            fontSize="xl"
            borderBottom={{
              base: toggled ? '1px solid grey' : 'none',
              xl: '1px solid grey'
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
            }
          />
        </InputGroup>
        {query && filteredProducts.length > 0 && (
          <Results display={display} products={filteredProducts} />
        )}
      </form>
    </Box>
  );
};

export default withRouter(Search);
