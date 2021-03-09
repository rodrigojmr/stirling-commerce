import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import styled from '@emotion/styled';
import {
  DotButton,
  PrevButton,
  NextButton,
  SliderButton,
  PrevArrow,
  NextArrow
} from './carouselButtons';
import { Embla, Viewport, CarouselContainer } from './styles';

// TODO Split style from the component itself, pass through props
const Slide = styled.li`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
`;

const Dots = styled.ol`
  position: absolute;
  display: flex;
  list-style: none;
  margin-left: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
  left: 0;
  bottom: 0;
`;
interface HeroSliderProps {
  options: {
    loop: boolean;
    draggable: boolean;
    arrows: boolean;
    containScroll: '' | 'trimSnaps' | 'keepSnaps';
    dragFree: boolean;
  };
  children:
    | ReactElement<{ background: string }>
    | ReactElement<{ background: string }>[];
}

const EmblaCarouselComponent: React.FC<HeroSliderProps> = ({
  options,
  children
}) => {
  const [emblaRef, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(index => embla?.scrollTo(index), [embla]);
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    };
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
    onSelect();
  }, [embla]);

  return (
    <Embla>
      <Viewport ref={emblaRef}>
        <CarouselContainer>
          {React.Children.map(children, (child, i) => (
            <Slide key={i}>{child}</Slide>
          ))}
        </CarouselContainer>
      </Viewport>
      <Dots>
        {scrollSnaps.map((snap, index) => (
          <li key={index}>
            <DotButton
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
              key={index}
            />
          </li>
        ))}
      </Dots>
      {options.arrows && (
        <>
          <SliderButton
            top={{ base: '90%', lg: '50%' }}
            left={{ base: '1rem', lg: '3rem' }}
            w={{ base: '1.3rem' }}
            h={{ base: '1.3rem' }}
            onClick={scrollPrev}
            enabled={prevBtnEnabled}
          >
            <PrevArrow
              w={{ base: '1.2rem', lg: '2rem' }}
              h={{ base: '1.2rem', lg: '2rem' }}
            />
          </SliderButton>
          <SliderButton
            top={{ base: '90%', lg: '50%' }}
            right={{ base: '1rem', lg: '3rem' }}
            w={{ base: '1.3rem' }}
            h={{ base: '1.3rem' }}
            onClick={scrollNext}
            enabled={nextBtnEnabled}
          >
            <NextArrow
              w={{ base: '1.2rem', lg: '2rem' }}
              h={{ base: '1.2rem', lg: '2rem' }}
            />
          </SliderButton>
          {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
        </>
      )}
    </Embla>
  );
};

export default EmblaCarouselComponent;
