import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface InputStyleProps {
  backgroundColor?: string;
  color: string;
  fontSize?: string;
  error?: string;
  borderColor?: string;
}

export const StyledInput = styled.input<InputStyleProps>`
  position: relative;
  width: 100%;
  font-family: 'Bebas Neue';
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  outline: none;
  border: none;
  padding: 1rem 1.5rem;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border-bottom: ${({ borderColor }) => `1px solid ${borderColor || 'black'}`};
  border: ${({ error }) => (error ? ' solid 1px red' : '')};
`;

export const heroSliderStyle = css`
  position: relative;
  padding: 8rem;
  height: 90vh;
`;
