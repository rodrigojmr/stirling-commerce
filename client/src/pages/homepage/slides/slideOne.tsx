import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import ButtonLink from 'components/buttons/buttonLink';
import React, { ReactElement } from 'react';

type SlideTypes = {
  background: string;
};

const SlideOne = ({ background }: SlideTypes): ReactElement => {
  return (
    <Flex
      align="center"
      justify={{ base: 'center', lg: 'flex-start' }}
      p={{ base: '5rem 10vw' }}
      height={{ base: '80vh', lg: '45vw' }}
      minH={{ base: '40vh', lg: '50rem' }}
      background={`url(${background}), linear-gradient(to right, black, black)`}
      bgSize="auto 100%, cover"
      backgroundPosition="left center"
      backgroundRepeat="no-repeat"
    >
      <Box maxHeight="auto" zIndex={1} ml="auto">
        <Heading
          fontSize={{
            base: 'clamp(2rem, 20vw, 6rem)',
            lg: 'clamp(8rem, 8vw,  14rem)'
          }}
          lineHeight="none"
          color="white"
          as="h1"
        >
          Bicycle
          <br />
          Accessories
        </Heading>
        <Text
          maxW="80%"
          mb={[8, 8, 12]}
          fontSize={{
            base: 'clamp(1.4rem, 5vw, 2rem)',
            lg: 'clamp(1.5rem, 1.4vw, 2.2rem)'
          }}
          color="lighter-grey"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
        <ButtonLink
          to="/"
          fontSize={{
            base: 'clamp(1.4rem, 5vw, 2rem)',
            lg: 'clamp(1.8rem, 1.4vw, 2.2rem)'
          }}
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
