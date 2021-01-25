import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Grid,
  Box,
  Image,
  Heading,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from '@chakra-ui/react';
import { Redirect, useLocation } from 'react-router-dom';
import LifterImg from 'assets/lifter.avif';
import { useForm } from 'react-hook-form';
import LogInForm from 'components/form/loginForm';
interface stateType {
  from: { pathname: string };
}

const UserLogin = () => {
  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  const { state } = useLocation<stateType>();

  if (redirectToReferrer) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(1, minmax(30rem, min-content))"
      alignItems="center"
    >
      <Box padding="0 10vw" gridColumn="1 / 2" gridRow="1 / span 1">
        <Heading as="h1">Log In</Heading>
        <LogInForm />
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

export default UserLogin;
