import * as React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyle from './theme/globalStyles';
import Navbar from './components/Navbar';
import theme from './theme/theme';

import Home from './views/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/men">
            Men's
          </Route>
          <Route exact path="/women">
            Women's
          </Route>
          <Route exact path="/kids">
            Kids
          </Route>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
