import { Box, Grid, Heading } from '@chakra-ui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { SignInParams } from '@shared/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import SignInForm from 'components/form/loginForm';
import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { requestSignIn } from 'store/slices/userSlice';

interface stateType {
  from: { pathname: string };
}

const SignInPage = ({ history }: RouteComponentProps) => {
  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  const { state } = useLocation<stateType>();
  const dispatch = useAppDispatch();

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
