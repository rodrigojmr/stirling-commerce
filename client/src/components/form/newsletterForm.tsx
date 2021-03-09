import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// const StyledForm = styled.form`
//   width: 100%;
//   display: flex;
//   position: relative;

//   & > input {
//     flex-grow: 1;
//   }
// `;

// const FormButton = styled.button`
//   ${ImportantTextStyle}
//   position: absolute;
//   right: 0;
//   top: 50%;
//   transform: translateY(-50%);
//   font-size: 2.5rem;
// `;

interface Values {
  email: string;
}

// TODO Add visual notifiers for errors in inputting

const NewsletterForm = () => {
  const { handleSubmit, errors, register, formState } = useForm();

  const [error, setError] = useState('');

  const onSubmit = (values: Values) => {
    console.log({ values });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display="flex" flexWrap="wrap" isInvalid={errors.email}>
        <FormLabel position="absolute" htmlFor="email"></FormLabel>
        <Input
          borderBottom="2px solid black"
          borderBottomRadius="0"
          paddingBottom="0.7rem"
          paddingLeft="2rem"
          variant="unstyled"
          fontSize={{ base: '1.4rem', lg: '2xl' }}
          fontWeight="600"
          name="email"
          placeholder="Enter your email address"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address'
            }
          })}
        />
        <Button
          position="absolute"
          right="0"
          fontSize={{ base: '1.4rem', lg: '2xl' }}
          variant="link"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Subscribe &gt;
        </Button>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default NewsletterForm;
