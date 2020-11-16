import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { PrevButton, NextButton } from './EmblaCarouselButtons';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Embla, Viewport, Container } from './styles';
import { SlideProduct } from '../../types';
import ProductSlide from './ProductSlide';

// import { mediaByIndex } from "../media";

// Set styled components style same as native css
const Slide = styled.li<{ slides: number }>`
  position: relative;
  min-width: ${props => `${100 / props.slides}%`};
  &:not(:last-child) {
    margin-right: 3rem;
  }
`;
// Progress bar width = width of component / something
// Move progress bar by a certain amount
const ProgressBar = styled.div``;

const Star = styled.span<{ filled: boolean }>``;

interface Options {
  loop: boolean;
  draggable: boolean;
  arrows: boolean;
  containScroll: '' | 'trimSnaps' | 'keepSnaps';
  dragFree: boolean;
}

const ProductsCarousel: React.FC<{
  options: Options;
  products: SlideProduct[];
}> = ({ options, products }) => {
  const [emblaRef, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    onScroll();
    embla.on('select', onSelect);
    embla.on('scroll', onScroll);
  }, [embla, onSelect, onScroll]);

  return (
    <>
      <Embla>
        <Viewport ref={emblaRef}>
          <Container>
            {products.map((product, i) => (
              <Slide key={i} slides={4}>
                <ProductSlide product={product} />
              </Slide>
            ))}
          </Container>
        </Viewport>
        {options.arrows && (
          <>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </>
        )}
      </Embla>
      <div className="embla__progress">
        <div
          className="embla__progress__bar"
          style={{ transform: `translateX(${scrollProgress}%)` }}
        />
      </div>
    </>
  );
};

export default ProductsCarousel;
