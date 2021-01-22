import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { RoundButton } from './index';
import { Button, ButtonProps, IconButton, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ReactComponent as CartLogo } from '../../assets/shopping-cart.svg';

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

interface ButtonLinkProps extends ButtonProps {
  to: string;
  color?: string;
  iconColor: string;
  buttonColor: string;
  fontSize: string;
  icongSpacing?: string;
  children: string | React.ReactNode;
}

// TODO Change to EM
const ButtonLink = ({
  color,
  children,
  iconColor,
  buttonColor,
  fontSize,
  icongSpacing = '4.5rem',
  to,
  ...props
}: ButtonLinkProps) => (
  <Button
    {...props}
    fontSize={fontSize}
    as={Link}
    to={to}
    iconSpacing={icongSpacing}
    borderColor={buttonColor}
    variant="round-arrow"
    rightIcon={
      <ChevronRightIcon
        display="block"
        color={iconColor}
        backgroundColor={buttonColor}
        borderRadius="3em"
        w="1.5em"
        h="1.1em"
      />
    }
  >
    <Text
      marginBottom="-.07em"
      fontFamily="Bebas Neue"
      fontSize={fontSize}
      color={color || iconColor}
    >
      {children}
    </Text>
  </Button>
);

export default ButtonLink;
