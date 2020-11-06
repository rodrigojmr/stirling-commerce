import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LinkProps {
  fontSize: string;
  color: string;
}

export const StyledLink = styled(Link)<LinkProps>`
  font-family: 'Bebas Neue';
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
`;
