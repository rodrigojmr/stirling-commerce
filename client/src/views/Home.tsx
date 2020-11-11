import React from 'react';
import EmblaCarousel from '../components/Carousel/EmblaCarousel';

const Home = () => {
  return (
    <div>
      <EmblaCarousel options={{ draggable: false, loop: true }}>
        <div>One</div>
        <div>two</div>
        <div>three</div>
      </EmblaCarousel>
    </div>
  );
};

export default Home;
