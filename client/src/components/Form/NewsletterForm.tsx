import { useState } from 'react';
import styled from 'styled-components';
import { ImportantTextStyle, StyledInput } from '../styled';
import theme from '../../theme/theme';

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  position: relative;

  & > input {
    flex-grow: 1;
  }
`;

const FormButton = styled.button`
  ${ImportantTextStyle}
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
`;

// TODO Add visual notifiers for errors in inputting

const NewsletterForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  return (
    <StyledForm>
      <label htmlFor="email-input"></label>
      <StyledInput
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
      />
      <FormButton color={theme.colors.primary} type="submit">
        Subscribe &gt;
      </FormButton>
      {error && <p>{error}</p>}
    </StyledForm>
  );
};

export default NewsletterForm;
