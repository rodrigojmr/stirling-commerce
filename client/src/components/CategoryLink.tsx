import React from 'react';
import styled from '@emotion/styled';
import ButtonLink from './Buttons/ButtonLink';
import { Heading } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

interface CategoryProps {
  bg: string;
  buttonColor: string;
  image: string;
  title: string;
  link: string;
  category: string;
  children: string | JSX.Element[] | JSX.Element;
}

// const Wrapper = styled.div<{ colorScheme: string }>`
//   display: flex;
//   background-color: ${props =>
//     props.colorScheme === 'primary' ? props.theme.colors.primary : 'black'};
//   padding: 6rem;
//   color: white;
//   flex: 0 0 50%;
//   align-items: center;

//   & > * {
//     flex: 0 0 50%;
//   }
// `;

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
  link
}: CategoryProps) => {
  return (
    <Flex
      flexBasis="50%"
      p={'6rem'}
      color="white"
      alignItems="center"
      bgColor={bg}
    >
      <div>
        <Image src={image} />
      </div>
      <div>
        <Heading color="white" fontSize="3rem" as="h3">
          {category}
        </Heading>
        <Heading color="white" mb="1rem" as="h1" fontSize="7rem">
          {title}
        </Heading>
        <Text mb="3rem">{children}</Text>
        //TODO Change to new button
        <ButtonLink iconColor={buttonColor} borderColor={buttonColor} to={link}>
          Shop Now
        </ButtonLink>
      </div>
    </Flex>
  );
};

export default CategoryLink;
