import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import ButtonLink from '../Buttons/ButtonLink';
import { heroSliderStyle } from '../styled';
type SlideTypes = {
  background: string;
};

const StyledContainer = styled.article<SlideTypes>`
  ${heroSliderStyle}
  background-image: url(${({ background }) => background}),
        linear-gradient(to right, #000, #000);
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

const SlideOne = ({ background }: SlideTypes): ReactElement => {
  return (
    <Flex
      align="center"
      p="8rem 11vw"
      height="45vw"
      minH="60rem"
      background={`url(${background}), linear-gradient(to right, black, black)`}
      bgSize="auto 100%, cover"
      backgroundPosition="left center"
      backgroundRepeat="no-repeat"
    >
      <Box maxHeight="auto" zIndex={1} ml="auto">
        <Heading
          fontSize="clamp(8rem, 8vw,  14rem)"
          lineHeight="none"
          color="white"
          as="h1"
        >
          Bicycle
          <br />
          Accessories
        </Heading>
        <Text maxW="80%" mb={12} fontSize="1.4vw" color="lighter-grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
        <ButtonLink
          to="/"
          fontSize="1.3vw"
          buttonColor="primary.500"
          iconColor="white"
        >
          SHOP NOW
        </ButtonLink>
      </Box>
    </Flex>
  );
};

export default SlideOne;
