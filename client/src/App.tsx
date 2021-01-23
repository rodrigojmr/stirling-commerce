import * as React from 'react';
import { Provider } from 'react-redux';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import store from './store';
import Navbar from './ui/nav/navbar';
import Footer from './ui/footer';
import Home from './pages/homepage';
import SingleProduct from './pages/productPage';
import ScrollToTop from './hooks/ScrollToTop';
import UserLogin from './pages/UserLogin';
import PrivateRoute from './utils/privateRoute';

const App: React.FC = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          {/* <GlobalStyle /> */}
          <Navbar />
          <Box as="main" minHeight="30rem">
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
              <PrivateRoute path="/login" component={UserLogin} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Box>
          <Footer />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
