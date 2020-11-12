import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { heroSliderStyle } from '../styled';

interface ImageProps {
  src: string;
}

type SlideTypes = {
  background: string;
};

const StyledContainer = styled.article<SlideTypes>`
  ${heroSliderStyle}
  background-image: ${({ background }) => background};
`;

const StyledImage = styled.img<ImageProps>`
  position: absolute;
  top: -50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
`;

const TextContainer = styled.div`
  z-index: 1;
  margin-left: 60%;
`;

const StyledHeader = styled.h2`
  color: white;
  font-weight: 600;
  font-size: 10rem;
  line-height: 1;
`;

// TODO  ({ background }: SlideProps): JSX.Element => {
// type SlideProps = { background: string };

const SlideOne = ({ background }: SlideTypes): ReactElement => {
  return (
    <StyledContainer background={background}>
      <TextContainer>
        <StyledHeader>Bicycle Acessories</StyledHeader>
      </TextContainer>
      <StyledImage src="/images/carousel-bicycle.webp"></StyledImage>
    </StyledContainer>
  );
};

export default SlideOne;
