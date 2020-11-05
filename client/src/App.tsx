import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './theme/globalStyles';

const Main = styled.div`
  background-color: red;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Main></Main>
    </>
  );
};

export default App;
