import styled from 'styled-components';

interface Props {
  name: string;
  label: string;
  type: 'text' | 'number' | 'password';
  placeholder: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  className?: string;
  value: any;
  error: string;
  children: string;
}

const StyledInput = styled.input<{ error: string }>`
  border: ${({ error }) => (error ? ' solid 1px red' : '')};
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
