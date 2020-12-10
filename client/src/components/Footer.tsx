import React from 'react';
import styled from 'styled-components';
import { footerLinks } from '../data/links';

const Container = styled.footer`
  background-color: black;
  padding: 6rem 10vw;
`;

const Wrapper = styled.div`
  display: grid;
`;

const StyledList = styled.li``;

const Footer = () => {
  return (
    <Container>
      <Wrapper></Wrapper>
    </Container>
  );
};

export default Footer;
