import * as React from 'react';
import { Provider } from 'react-redux';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import store from './store';
import Footer from './ui/footer';
import Home from './pages/homepage';
import SingleProduct from './pages/productPage';
import ScrollToTop from './hooks/ScrollToTop';
import UserLogin from './pages/UserLogin';
import PrivateRoute from './utils/privateRoute';
import { Helmet } from 'react-helmet';
import Navbar from 'ui/header';

const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Helmet>
            <html lang="en" />
            {/* body attributes */}
            <body className="root" />
            {/* multiple meta elements */}
            <title>Stirling Sports</title>
            <meta name="description" content="Helmet application" />
            <meta
              property="og:description"
              content="Stirling Sports Redesign React Site"
            />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/dxxvlmkqg/image/upload/v1611417522/sports-commerce/chrome_ec3wlWQA4i_g635l9.png"
            />
          </Helmet>
          <Navbar />
          <Box as="main" minHeight="30rem">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/men">
                Men's
              </Route>
              c
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
          <ScrollToTop />{' '}
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
