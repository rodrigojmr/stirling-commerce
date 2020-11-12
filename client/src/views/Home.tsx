import React from 'react';
import styled from 'styled-components';
import EmblaCarousel from '../components/Carousel/EmblaCarousel';

import SlideOne from '../components/Slides/SlideOne';

const carouselOptions = { draggable: false, loop: true, arrows: true };

const Home = () => {
  return (
    <EmblaCarousel options={carouselOptions}>
      <SlideOne background="/images/carousel-bicycle.webp" />
    </EmblaCarousel>
  );
};

export default Home;
