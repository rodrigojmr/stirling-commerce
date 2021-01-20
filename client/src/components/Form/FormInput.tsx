import styled from '@emotion/styled';
import { StyledInput } from '../styled';
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
        color="white"
        backgroundColor="transparent"
        borderColor="white"
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
