import * as React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import store from './store';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import SingleProduct from './views/SingleProduct';

const App: React.FC = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          {/* <GlobalStyle /> */}
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
            <Route path="/product/:id" component={SingleProduct} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
