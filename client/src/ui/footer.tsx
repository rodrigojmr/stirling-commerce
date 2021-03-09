import {
  Flex,
  Heading,
  Icon,
  Link,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { breakpoints } from 'theme/theme';
import { ReactComponent as FacebookLogo } from '../assets/facebook.svg';
import { ReactComponent as InstagramLogo } from '../assets/instagram.svg';
import { ReactComponent as RSSLogo } from '../assets/rss.svg';
import { footerLinks } from '../data/links';

const Container = styled.footer`
  background-color: black;
  padding: 5rem 10vw;
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, max-content));

  @media screen and (min-width: ${breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 20rem 6rem;
  }
`;

const columnContent = (navSection: footerNavSectionType) => (
  <>
    <Heading as="h3" display="inline-block" color="primary.500" fontSize="3xl">
      {navSection.title}
    </Heading>
    <UnorderedList ml="0" spacing=".8rem" listStyleType="none">
      {navSection.links.map(link => (
        <ListItem key={link.name.toLowerCase()}>
          <Link
            as={RouterLink}
            fontSize="2xl"
            color="lighter-grey"
            to={link.link}
          >
            {link.name}
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  </>
);

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        {footerLinks.map((section, i) => (
          <Flex direction="column" key={i}>
            {columnContent(section)}
          </Flex>
        ))}
        <Flex direction="column">
          <Heading as="h3" color="primary.500" fontSize="2xl" mb={4}>
            Follow Us
          </Heading>
          <Flex
            css={css`
              > *:not(:last-child) {
                margin-right: 1rem;
              }
            `}
          >
            <Link to="#">
              <Icon
                as={InstagramLogo}
                w={30}
                h={30}
                stroke="white"
                _hover={{ stroke: 'primary.500' }}
              />
            </Link>
            <Link to="#">
              <Icon
                as={FacebookLogo}
                w={30}
                h={30}
                stroke="none"
                fill="white"
                _hover={{ fill: 'primary.500' }}
              />
            </Link>
            <Link to="#">
              <Icon
                as={RSSLogo}
                w={30}
                h={30}
                strokeWidth="2.5"
                stroke="white"
                _hover={{ stroke: 'primary.500' }}
              />
            </Link>
          </Flex>
        </Flex>
      </Wrapper>
      <Link
        pt={4}
        display="inline-block"
        color="white"
        padding="1rem"
        ml="-1rem"
        target="_blank"
        fontSize="2xl"
        letterSpacing="1px"
        to="https://dribbble.com/shots/4702361-Sports-Wear-Website-Redesign-Homepage"
      >
        Based on a design by Marius Naujokas - check it out on Dribble.
      </Link>
    </Container>
  );
};

export default Footer;
