import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import ButtonLink from './Buttons/ButtonLink';

interface CategoryProps {
  bg: string;
  color: string;
  buttonColor: string;
  image: string;
  title: string;
  link: string;
  category: string;
  children: string | JSX.Element[] | JSX.Element;
}

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CategoryLink = ({
  children,
  bg,
  buttonColor,
  image,
  category,
  title,
  link,
  color
}: CategoryProps) => {
  return (
    <Flex
      flexBasis="50%"
      p="8rem"
      color="white"
      alignItems="center"
      bgColor={bg}
    >
      <Box mr="2rem">
        <Image src={image} />
      </Box>
      <Flex direction="column" align="start">
        <Heading color="white" fontSize="3rem" as="h3">
          {category}
        </Heading>
        <Heading color="white" mb="1rem" as="h1" fontSize="7rem">
          {title}
        </Heading>
        <Text fontSize="1.8rem" mb="3rem">
          {children}
        </Text>
        <ButtonLink
          fontSize="2rem"
          color={color}
          iconColor="white"
          buttonColor={buttonColor}
          to={link}
        >
          Shop Now
        </ButtonLink>
      </Flex>
    </Flex>
  );
};

export default CategoryLink;
