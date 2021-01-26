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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, Redirect, useLocation } from 'react-router-dom';

interface stateType {
  from: { pathname: string };
}

const LogInForm = () => {
  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  const { state } = useLocation<stateType>();
  const { handleSubmit, errors, register, formState } = useForm();
  const [password, setPassword] = useState('');

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

  interface FormValues {
    email: string;
    password: string;
  }

  function onSubmit(values: FormValues) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }
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
      <Button
        mt="1.5rem"
        width="100%"
        colorScheme="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Sign In
      </Button>
      <Center mt=".5rem">
        <Text color="grey">
          Don't have an account?{' '}
          <Link fontFamily="body" as={RouterLink} to="/sign-up">
            Sign Up!
          </Link>
        </Text>
      </Center>
    </form>
  );
};

export default LogInForm;
