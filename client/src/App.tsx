import * as React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import routes from 'data/routes';
import { drawerContext, useDrawer } from 'hooks/useDrawer';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { requestProducts } from 'store/slices/productSlice';
import { getUser } from 'store/slices/userSlice';
import Navbar from 'ui/header';
import PublicRoute from 'utils/publicRoute';
import ScrollToTop from './hooks/ScrollToTop';
import store from './store';
import { CustomTheme } from './theme/theme';
import Footer from './ui/footer';
import PrivateRoute from './utils/privateRoute';

const App = () => {
  const drawer = useDrawer();

  useEffect(() => {
    store.dispatch(getUser());
    store.dispatch(requestProducts());
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
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Box>
          <Footer />
          <ScrollToTop />
        </BrowserRouter>
      </drawerContext.Provider>
    </ChakraProvider>
  );
};

export default App;
