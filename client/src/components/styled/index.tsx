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
  padding: 3rem;
`;
