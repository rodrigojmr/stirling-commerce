import * as React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { CustomTheme, ThemeType } from './theme/theme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import store from './store';
import Footer from './ui/footer';
import Home from './pages/homepage';
import SingleProduct from './pages/productPage';
import ScrollToTop from './hooks/ScrollToTop';
import SignInPage from './pages/signInPage';
import PrivateRoute from './utils/privateRoute';
import { Helmet } from 'react-helmet';
import Navbar from 'ui/header';
import RegisterPage from './pages/registerPage';
import { drawerContext, useDrawer } from 'hooks/useDrawer';
import { useAppDispatch } from 'store';
import { getUser } from 'store/slices/userSlice';
import PublicRoute from 'utils/publicRoute';
import routes from 'data/routes';

const App = () => {
  const drawer = useDrawer();

  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  const routeComponents = routes.map((routeProps, key) => {
    if (routeProps.restricted) {
      return <PublicRoute {...routeProps} key={key} />;
    } else if (routeProps.isPrivate) {
      const { isPrivate, ...props } = routeProps;
      return <PrivateRoute {...props} key={key} />;
    } else {
      const { restricted, isPrivate, ...props } = routeProps;
      return <Route {...props} key={key} />;
    }
  });

  return (
    <ChakraProvider resetCSS theme={CustomTheme}>
      <Provider store={store}>
        <drawerContext.Provider value={drawer}>
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
                {routeComponents}
                {/* <Route exact path="/">
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
                <PublicRoute
                  restricted={true}
                  path="/sign-in"
                  component={SignInPage}
                />
                <PublicRoute
                  restricted={true}
                  path="/register"
                  component={RegisterPage}
                /> */}
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </Box>
            <Footer />
            <ScrollToTop />{' '}
          </BrowserRouter>
        </drawerContext.Provider>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
