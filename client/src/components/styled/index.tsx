import * as React from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { space, color, layout, SpaceProps, ColorProps } from 'styled-system';

export const Section = styled.section<{
  backgroundColor?: string;
  padding?: string;
}>`
  padding: ${({ padding }) => padding || '10rem 0'};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
`;

export const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 0 5vw;
  margin: 0 auto;
`;

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
  fontFamily?: string;
  fontSize: string;
  as: string;
  children?: string | JSX.Element[] | JSX.Element;
}

export const Heading = styled.h1<HeaderProps & SpaceProps>`
  color: ${({ color }) => color || 'white'};
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  line-height: 1;
  ${space};
`;

interface TextProps {
  color?: string;
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
}

export const Text = styled.p<TextProps & SpaceProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-family: ${({ fontFamily }) => fontFamily};
  ${space}
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
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  align-items: center;
  align-self: flex-start;
  color: ${({ themed, secondary }) => themed || secondary};
  font-family: 'Bebas Neue';
  font-weight: 400;
  font-size: 2.5rem;
  border: 3px solid ${({ themed, primary }) => themed || primary};
  border-radius: 3rem;
`;

type ArrowProps = ButtonThemed | ButtonColor;

export const ButtonArrow = styled.div<ArrowProps>`
  display: flex;
  align-items: center;
  justify-content: center;
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
