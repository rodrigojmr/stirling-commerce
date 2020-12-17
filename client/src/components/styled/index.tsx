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

export const FlexApartWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:nth-child(2) {
    margin-left: auto;
  }
`;

export const CenteringFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface ImportantTextProps {
  fontSize?: string;
  color?: string;
}

export const ImportantTextStyle = css<ImportantTextProps>`
  font-family: 'Bebas Neue';
  font-weight: 400;
  font-size: ${props => props.fontSize || '3rem'};
  color: ${props => props.color || 'black'};
`;

interface LinkProps extends ImportantTextProps {
  to: string;
}

export const StyledLink = styled(NavLink)<LinkProps>`
  display: inline-block;
  ${ImportantTextStyle}

  transition: all 0.2s;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;
interface HeaderProps {
  fontSize: string;
  as: string;
  children?: string | JSX.Element[] | JSX.Element;
}

export const Heading = styled.h1<HeaderProps & SpaceProps>`
  ${ImportantTextStyle}
  font-size: ${({ fontSize }) => fontSize};
  line-height: 1;
  ${space};
`;

export const ProductTitle = styled(Heading)`
  font-family: 'Source Sans Pro';
  font-weight: 700;
`;
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
