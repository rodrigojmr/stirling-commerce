import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, Redirect, useLocation } from 'react-router-dom';

interface stateType {
  from: { pathname: string };
}

const RegisterForm = () => {
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

  const passStrenght = (password: string) => {
    var strongRegex = new RegExp(
      '^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$',
      'g'
    );
    var mediumRegex = new RegExp(
      '^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$',
      'g'
    );
    if (strongRegex.test(password)) {
      console.log('strong');
      return 'Strong!';
    } else if (mediumRegex.test(password)) {
      console.log('medium');
      return "It's decent.";
    } else if (password.length > 7) {
      return 'Weak!';
    }
  };

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
      <FormControl id="name" isInvalid={errors.email}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          fontFamily="body"
          placeholder="Tom Hardy"
          required
          type="name"
          name="name"
          ref={register()}
        />
        <Box mb=".5rem">
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
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
        {password && (
          <Box my=".5rem" ml=".5rem">
            <Text>{passStrenght(password)}</Text>
          </Box>
        )}
      </FormControl>
      <Flex mt="1.5rem" justifyContent="space-between">
        <Button
          flexBasis="48%"
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Register
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          flexBasis="48%"
          as={RouterLink}
          to="/sign-in"
        >
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default RegisterForm;
