import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RoundButton } from './index';

const Container = styled(RoundButton)<ThemeOrColorsProps>`
  display: inline-flex;
  padding-left: 3rem;
  align-items: center;
  align-self: flex-start;
`;

const Arrow = styled.div<ThemeOrColorsProps>`
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

const ButtonLink = ({ children, ...props }: ButtonLinkType): JSX.Element => (
  <Container as={Link} {...props}>
    {children}
    <Arrow {...props}>
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
    </Arrow>
  </Container>
);

export default ButtonLink;
