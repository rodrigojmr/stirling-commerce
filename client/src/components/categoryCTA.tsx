import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import ButtonLink from './buttons/buttonLink';

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
      px="5vw"
      py={28}
      color="white"
      alignItems="center"
      bgColor={bg}
    >
      <Box mr={12}>
        <Image src={image} />
      </Box>
      <Flex flexBasis="40%" direction="column" align="start">
        <Heading color="white" fontSize="3xl" as="h3">
          {category}
        </Heading>
        <Heading color="white" mb="1rem" as="h1" fontSize="7xl">
          {title}
        </Heading>
        <Text fontSize="xl" mb="3rem">
          {children}
        </Text>
        <ButtonLink
          fontSize="2xl"
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