import React from 'react';
import styled from 'styled-components';
import theme from '../theme/theme';
import {
  Heading,
  Text,
  ButtonLink,
  Section,
  Button
} from '../components/styled';

interface CategoryProps {
  colorScheme: 'primary' | 'dark';
  image: string;
  title: string;
  link: string;
  category: string;
  children: string | JSX.Element[] | JSX.Element;
}

const Wrapper = styled.div<{ colorScheme: string }>`
  display: flex;
  background-color: ${props =>
    props.colorScheme === 'primary' ? props.theme.colors.primary : 'black'};
  padding: 6rem;
  color: white;
  flex: 0 0 50%;
  align-items: center;

  & > * {
    flex: 0 0 50%;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CategoryLink = ({
  children,
  colorScheme,
  image,
  category,
  title,
  link
}: CategoryProps) => {
  const ButtonColor =
    colorScheme === 'primary' ? 'black' : theme.colors.primary;
  return (
    <Wrapper colorScheme={colorScheme}>
      <div>
        <Image src={image} />
      </div>
      <div>
        <Heading fontSize="3rem" as="h3">
          {category}
        </Heading>
        <Heading mb="1rem" as="h1" fontSize="7rem">
          {title}
        </Heading>
        <Text mb="3rem">{children}</Text>
        <ButtonLink to={link} themed={ButtonColor}>
          Shop Now
        </ButtonLink>
      </div>
    </Wrapper>
  );
};

export default CategoryLink;
