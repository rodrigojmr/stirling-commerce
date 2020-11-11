import * as React from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';
import { StyledInput } from './styled';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

const StyledForm = styled.form`
  position: relative;
  width: 25rem;
  margin-left: auto;
  margin-right: 4rem;
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
  return (
    <StyledForm>
      <StyledInput
        color="white"
        placeholder="search"
        backgroundColor={theme.colors.darkGrey}
      />
      <StyledIcon />
    </StyledForm>
  );
};

export default Search;
