import * as React from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

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
  color?: string;
  fontSize: string;
  as: string;
  children?: string | JSX.Element[] | JSX.Element;
}

export const Heading = styled.h1<HeaderProps>`
  color: ${({ color }) => color || 'white'};
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  line-height: 1;
`;

export const Text = styled.p<{ color: string }>`
  color: ${({ color }) => color};
`;

interface ButtonThemed {
  themed: string;
  primary?: never;
  secondary?: never;
}
interface ButtonColor {
  themed?: never;
  primary: string;
  secondary: string;
}

interface ButtonLink {
  children: React.ReactNode;
  to: string;
}
interface LinkProp {
  to: string;
}

type ButtonProps = (ButtonThemed | ButtonColor) & LinkProp;

export const Button = styled(Link)<ButtonProps>`
  display: inline-flex;
  padding: 1.4rem;
  padding-left: 3rem;
  align-items: center;
  color: ${({ themed, secondary }) => themed || secondary};
  font-family: 'Bebas Neue';
  font-weight: 400;
  font-size: 2.5rem;
  border: 3px solid ${({ themed, primary }) => themed || primary};
  border-radius: 3rem;
`;

type ArrowProps = ButtonThemed | ButtonColor;

export const ButtonArrow = styled.div<ArrowProps>`
  flex: 0;
  padding: 0.5rem 1.3rem;
  margin-left: 6rem;
  background-color: ${({ themed, primary }) => themed || primary};
  color: white;
  height: 100%;
  border-radius: 2rem;
  font-size: 0;
`;
interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
}

type ButtonLinkType = ButtonLinkProps & ButtonProps;

export const ButtonLink = ({
  children,
  ...props
}: ButtonLinkType): JSX.Element => (
  <Button {...props}>
    {children}
    <ButtonArrow {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.6rem"
        height="1.6rem"
        viewBox="0 0 24 24"
        stroke-width="3.5"
        stroke="white"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </ButtonArrow>
  </Button>
);
