import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  fontSize: string;
  color: string;
  to: string;
}

export const StyledLink = styled(NavLink)<LinkProps>`
  display: inline-block;
  font-family: 'Bebas Neue';
  font-weight: 400;
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  transition: all 0.2s;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

interface InputStyleProps {
  backgroundColor: string;
  placeholder: string;
  color: string;
}

export const StyledInput = styled.input<InputStyleProps>`
  font-family: 'Bebas Neue';
  width: 100%;
  outline: none;
  border: none;
  padding: 0.5em 1em;
  background-color: ${props => props.backgroundColor};
  border-bottom: 1px solid white;
  color: ${props => props.color};
`;

export const heroSliderStyle = css`
  position: relative;
  padding: 8rem;
  height: 90vh;
`;

interface HeaderProps {
  fontSize: string;
  as: string;
  children?: string;
}

export const Heading = styled.h1<HeaderProps>`
  color: white;
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  line-height: 1;
`;

export const Text = styled.p<{ color: string }>`
  color: ${({ color }) => color};
`;

export interface ButtonThemed {
  themed: string;
  primary?: never;
  secondary?: never;
}
export interface ButtonColor {
  themed?: never;
  primary: string;
  secondary: string;
}

export type ButtonProps = ButtonThemed | ButtonColor;

export const Button = styled.a<ButtonProps>`
  display: inline-block;
  color: ${({ themed, secondary }) => themed || secondary};
  font-family: 'Bebas Neue';
  font-weight: 400;
  border: 3px solid ${({ themed, primary }) => themed || primary};
  border-radius: 3rem;
  padding: 1.5rem 3rem;
`;
