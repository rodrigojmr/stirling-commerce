import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from '@chakra-ui/react';

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
  const [email, setEmail] = useState('');

  const onSubmit = (values: Values) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email"></FormLabel>
        <Input
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
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      {/* <StyledInput
        fontSize={'2rem'}
        id="email-input"
        backgroundColor="transparent"
        borderColor="black"
        color={theme.colors.grey}
        name="email"
        placeholder="Enter your email address"
        value={email}
        type="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setEmail(e.target.value)
        }
      /> */}
      <Button variant="link" isLoading={formState.isSubmitting} type="submit">
        Subscribe &gt;
      </Button>
    </form>
  );
};

export default NewsletterForm;
