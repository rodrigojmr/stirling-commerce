import { Box, Center, Grid, Heading, Link, Text } from '@chakra-ui/react';
import SignInForm from 'components/form/loginForm';
import React, { useState } from 'react';
import {
  Link as RouterLink,
  Redirect,
  RouteComponentProps,
  useLocation
} from 'react-router-dom';

interface stateType {
  from: { pathname: string };
}

const SignInPage = ({ history }: RouteComponentProps) => {
  const { state } = useLocation<stateType>();

  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  if (redirectToReferrer) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(1, minmax(40rem, min-content))"
      alignItems="center"
    >
      <Box padding="0 10vw" gridColumn="1 / 2" gridRow="1 / span 1">
        <Heading as="h1">Log In</Heading>
        <SignInForm />
        <Center mt=".5rem">
          <Text color="grey">
            Don't have an account?{' '}
            <Link fontFamily="body" as={RouterLink} to="/register">
              Sign Up!
            </Link>
          </Text>
        </Center>
        <Center fontSize="sm" color="gray.500">
          <>
            You can also use this user:
            <br /> user@randomuser.com
            <br />
            P@2e&E!c2*PTtnJ#R75J
          </>
        </Center>
      </Box>
      <Box gridColumn="1 / 2" gridRow="2 / span 1"></Box>
      <Box
        height="100%"
        gridColumn="2 / span 1"
        gridRow="1 / -1"
        bg="url(/images/lifter.avif)"
        bgSize="cover"
      ></Box>
    </Grid>
  );
};

export default SignInPage;
