import styled from '@emotion/styled';
import React from 'react';
import { Flex, Link, HStack, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as FacebookLogo } from '../assets/facebook.svg';
import { ReactComponent as InstagramLogo } from '../assets/instagram.svg';
import { ReactComponent as RSSLogo } from '../assets/rss.svg';
import { footerLinks } from '../data/links';
import theme from '../theme/theme';
import { Heading, UnorderedList, ListItem, Icon } from '@chakra-ui/react';
import { css } from '@emotion/react';

const Container = styled.footer`
  background-color: black;
  padding: 6rem 10vw;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 25rem 13rem;
`;

const Column = styled.div`
  & > *:first-child {
    margin-bottom: 3rem;
  }
`;

const columnContent = (navSection: footerNavSectionType) => (
  <>
    <Heading as="h3" color="primary.500" fontSize="2.5rem">
      {navSection.title}
    </Heading>
    <UnorderedList ml="0" spacing=".8rem" listStyleType="none">
      {navSection.links.map(link => (
        <ListItem>
          <Link
            as={RouterLink}
            fontSize="2rem"
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
        {footerLinks.map(section => (
          <Column>{columnContent(section)}</Column>
        ))}
        <Column>
          <Heading as="h3" color="primary.500" fontSize="2.5rem">
            Follow Us
          </Heading>
          <Flex
            css={css`
              > *:not(:last-child) {
                margin-right: 1rem;
              }
            `}
            spacing="1rem"
          >
            <Link to="#">
              <Icon as={InstagramLogo} w={30} h={30} stroke="white" />
            </Link>
            <Link to="#">
              <Icon
                as={FacebookLogo}
                w={30}
                h={30}
                stroke="none"
                fill="white"
              />
            </Link>
            <Link to="#">
              <Icon
                as={RSSLogo}
                w={30}
                h={30}
                strokeWidth="2.5"
                stroke="white"
              />
            </Link>
          </Flex>
        </Column>
      </Wrapper>
    </Container>
  );
};

export default Footer;
