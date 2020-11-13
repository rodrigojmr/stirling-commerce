import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { heroSliderStyle, Heading, Text, Button } from '../styled';
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
`;

// TODO  ({ background }: SlideProps): JSX.Element => {
// type SlideProps = { background: string };

const SlideOne = ({ background }: SlideTypes): ReactElement => {
  return (
    <StyledContainer background={background}>
      <TextContainer>
        <Heading fontSize="14rem" as="h1">
          Bicycle Acessories
        </Heading>
        <Text color={theme.colors.lighterGrey}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil natus
          porro sint minima quo error enim ratione impedit qui alias.
        </Text>
        <Button primary="white" secondary={theme.colors.primary}>
          Shop Now
        </Button>
      </TextContainer>
    </StyledContainer>
  );
};

export default SlideOne;
