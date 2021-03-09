import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, ButtonProps, StyleProps, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  to: string;
  children: string | React.ReactNode;
  iconColor: string;
  buttonColor: string;
} & ButtonProps;

// TODO Change to EM
const ButtonLink = ({
  color,
  children,
  iconColor,
  buttonColor,
  fontSize,
  iconSpacing = '4.5rem',
  to,
  ...props
}: ButtonLinkProps) => (
  <Button
    {...props}
    fontSize={fontSize}
    as={Link}
    to={to}
    iconSpacing={iconSpacing}
    borderColor={buttonColor}
    variant="round-arrow"
    rightIcon={
      <ChevronRightIcon
        display="block"
        color={iconColor}
        backgroundColor={buttonColor}
        borderRadius="5em"
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
