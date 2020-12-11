import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyle from './theme/globalStyles';
import theme from './theme/theme';
import store from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
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
          <Footer />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
