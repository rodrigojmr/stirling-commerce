import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text
} from '@chakra-ui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { SignInParams } from '@shared/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link as RouterLink,
  Redirect,
  RouteComponentProps,
  useLocation
} from 'react-router-dom';
import { useAppDispatch } from 'store';
import { RootState } from 'store/rootReducer';
import { requestSignIn } from 'store/slices/userSlice';
import { useHistory } from 'react-router-dom';

interface stateType {
  from: { pathname: string };
}

const SignInForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  // Form
  const submitStatus = useSelector((state: RootState) => state.auth.status);
  const { handleSubmit, errors, register, formState } = useForm();
  const [password, setPassword] = useState('');

  // Receive error from server is login fails
  const [error, setError] = useState<{ status: number; message: string }>();

  // Prepare redirect to page where user came from once they log in
  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  const { state } = useLocation<stateType>();
  console.log('state: ', state);
  if (redirectToReferrer) {
    return <Redirect to={state?.from || '/'} />;
  }

  function validateEmail(value: string) {
    //eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value) {
      return 'E-mail is required';
    } else if (!emailRegex.test(value)) {
      return 'Invalid e-mail.';
    } else return true;
  }

  const onSubmit = (values: SignInParams) => {
    // Pass history so that thunk can push redirect once logged in
    dispatch(requestSignIn({ values, history }))
      .then(unwrapResult)
      .then(originalPromiseResult => {})
      .catch(rejectedValueOrSerializedError => {
        setError(rejectedValueOrSerializedError);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          fontFamily="body"
          required
          type="email"
          name="email"
          placeholder="tomhardy@actor.com"
          ref={register({ validate: validateEmail })}
        />
        <Box mb=".5rem">
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
          {error?.status === 404 && <Text>{error.message}</Text>}
        </Box>
      </FormControl>
      <FormControl id="password" isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          fontFamily="body"
          required
          minLength={7}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="At least 7 characters."
          ref={register()}
        />
      </FormControl>
      {error?.status === 401 && <Text>{error.message}</Text>}
      <Button
        mt="1.5rem"
        width="100%"
        colorScheme="teal"
        type="submit"
        isLoading={formState.isSubmitting || submitStatus === 'loading'}
        loadingText="Submitting"
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
