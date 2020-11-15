import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { heroSliderStyle, Heading, Text, ButtonLink } from '../styled';
import theme from '../../theme/theme';

type SlideTypes = {
  background: string;
};

const StyledContainer = styled.article<SlideTypes>`
  ${heroSliderStyle}
  background-image: url(${({ background }) =>
    background}), linear-gradient(to right, #000, #000);
  background-size: auto 100%, cover;
  background-position: left center;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
`;

const TextContainer = styled.div`
  z-index: 1;
  margin-left: 60%;
  > a {
    margin-top: 4rem;
  }
  > p {
    max-width: 60%;
    /* TODO  Make font height reusable */
    line-height: 1.7;
  }
`;

// TODO  ({ background }: SlideProps): JSX.Element => {
// type SlideProps = { background: string };

const SlideOne = ({ background }: SlideTypes): ReactElement => {
  return (
    <StyledContainer background={background}>
      <TextContainer>
        <Heading fontSize="14rem" as="h1">
          Bicycle Accessories
        </Heading>
        <Text color="#888888">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
        <ButtonLink to="/" primary={theme.colors.primary} secondary="white">
          <span style={{ lineHeight: 1 }}>Shop Now</span>
        </ButtonLink>
      </TextContainer>
    </StyledContainer>
  );
};

export default SlideOne;
