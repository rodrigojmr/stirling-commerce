import * as React from "react";
import { useEffect } from "react";
import { Box, ChakraProvider, Flex, Icon } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Navbar from "ui/header";
import Footer from "./ui/footer";
import { ReactComponent as GithubLogo } from "assets/github.svg";
import { ReactComponent as LinkedinLogo } from "assets/linkedin.svg";

import ScrollToTop from "./hooks/ScrollToTop";
import { CustomTheme } from "./theme/theme";
import { drawerContext, useDrawer } from "hooks/useDrawer";

import store from "./store";
import { getUser } from "store/slices/userSlice";

import routes from "data/routes";
import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "utils/publicRoute";

import "@fontsource/bebas-neue";

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
            <Flex
              borderRadius="lg"
              width="7rem"
              justify="space-between"
              pos="fixed"
              right="0"
              bottom="0"
              p={4}
              bg="dark-grey"
            >
              <a
                href="https://github.com/rodrigojmr/stirling-commerce"
                target="_blank"
              >
                <Icon boxSize={8} fill="white" as={GithubLogo} />
              </a>
              <a
                href="https://www.linkedin.com/in/rodrigo-jorge-moura/"
                target="_blank"
              >
                <Icon boxSize={8} fill="white" as={LinkedinLogo} />
              </a>
            </Flex>
          </Box>
          <Footer />
          <ScrollToTop />
        </BrowserRouter>
      </drawerContext.Provider>
    </ChakraProvider>
  );
};

export default App;
