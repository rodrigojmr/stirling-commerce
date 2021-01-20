import styled from '@emotion/styled';
import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as FacebookLogo } from '../assets/facebook.svg';
import { ReactComponent as InstagramLogo } from '../assets/instagram.svg';
import { ReactComponent as RSSLogo } from '../assets/rss.svg';
import { footerLinks } from '../data/links';
import theme from '../theme/theme';
import { Heading } from '@chakra-ui/react';

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

const List = styled.ul`
  li:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

const ListItem = styled.li``;

const Footer = () => {
  const columnContent = (navSection: footerNavSectionType) => (
    <>
      <Heading as="h3" color={theme.colors.primary} fontSize="2.5rem">
        {navSection.title}
      </Heading>
      <List>
        {navSection.links.map(link => (
          <ListItem>
            <Link
              as={RouterLink}
              fontSize="2rem"
              color={theme.colors.lighterGrey}
              to={link.link}
            >
              {link.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Container>
      <Wrapper>
        {footerLinks.map(section => (
          <Column>{columnContent(section)}</Column>
        ))}
        <Column>
          <Heading as="h3" color={theme.colors.primary} fontSize="2.5rem">
            Follow Us
          </Heading>
          <div style={{ display: 'flex' }}>
            <Link to="#">
              <InstagramLogo stroke="white" />
            </Link>
            <Link to="#">
              <FacebookLogo stroke="none" fill="white" />
            </Link>
            <Link to="#">
              <RSSLogo strokeWidth="2.5" stroke="white" />
            </Link>
          </div>
        </Column>
      </Wrapper>
    </Container>
  );
};

export default Footer;
