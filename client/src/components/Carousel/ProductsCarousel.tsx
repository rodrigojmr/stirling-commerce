import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { PrevButton, NextButton } from './EmblaCarouselButtons';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Embla, Viewport, CarouselContainer, Slide } from './styles';
import { SlideProduct } from '../../types';
import ProductSlide from './ProductSlide';

// Progress bar width = width of component / something
// Move progress bar by a certain amount

const Progress = styled.div`
  position: relative;
  background-color: #f4f4f4;
  margin-top: 20px;
  max-width: 45rem;
  width: calc(100% - 4rem);
  height: 4px;
  overflow: hidden;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
`;
const ProgressBar = styled.div<{ progress: number; slides: number }>`
  position: absolute;
  background-color: #1bcacd;
  top: 0;
  bottom: 0;
  ${({ progress, slides }) => {
    const width = (4 / slides) * 100;
    const left = (100 - width) * (progress / 100);
    return `
      width: ${width}%;
      transform: translateX(${left}%)
    `;
  }}
`;

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

  console.log('scrollProgress: ', scrollProgress);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    onScroll();
    embla.on('select', onSelect);
    embla.on('scroll', onScroll);
  }, [embla, onSelect, onScroll]);

  // TODO Replace with number slides to show
  const progressBarWidth = (4 / products.length) * 100;

  return (
    <>
      <Embla>
        <Viewport ref={emblaRef}>
          <CarouselContainer>
            {products.map((product, i) => (
              <Slide key={i} slides={4}>
                <ProductSlide product={product} />
              </Slide>
            ))}
          </CarouselContainer>
        </Viewport>
        {options.arrows && (
          <>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </>
        )}
      </Embla>
      <Progress>
        <ProgressBar progress={scrollProgress} slides={products.length} />
      </Progress>
    </>
  );
};

export default ProductsCarousel;
