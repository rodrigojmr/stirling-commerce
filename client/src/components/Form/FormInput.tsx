import styled from 'styled-components';

interface Props {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'password' | 'email';
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: any;
  error: string;
}

const StyledInput = styled.input<{ error: string }>`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  padding: 2rem 3rem;
  border: ${({ error }) => (error ? ' solid 1px red' : '')};
  font-family: 'Bebas Neue';
  font-size: 2.5rem;
`;

const FormInput: React.FC<Props> = ({
  name,
  label,
  type = 'text',
  placeholder,
  onChange,
  className = '',
  value,
  error,
  children,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <StyledInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        error={error}
      />
      {error && <p>{error}</p>}
    </>
  );
};

export default FormInput;
