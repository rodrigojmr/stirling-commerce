import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import styled from 'styled-components';
import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons';

const Embla = styled.section`
  position: relative;
`;

const Viewport = styled.div<{
  ref: <ViewportElement extends HTMLElement>(
    instance: ViewportElement | null
  ) => void;
}>`
  overflow: hidden;
  &.is-draggable {
    cursor: move;
    cursor: grab;
  }

  &.is-dragging {
    cursor: grabbing;
  }
`;

// TODO Split style from the component itself, pass through props

const Container = styled.ul`
  display: flex;
  will-change: transform;
  margin-left: -1rem;
  list-style-type: none;
`;

const Slide = styled.li`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  counter-increment: embla;
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

interface CarouselProps {
  options: {
    loop: boolean;
    draggable: boolean;
    arrows: boolean;
  };
  children:
    | ReactElement<{ background: string }>
    | ReactElement<{ background: string }>[];
}

const EmblaCarouselComponent: React.FC<CarouselProps> = ({
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
    if (embla) {
      const onSelect = () => {
        setSelectedIndex(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
      };
      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla]);

  console.log(children);

  return (
    <Embla>
      <Viewport ref={emblaRef}>
        <Container>
          {React.Children.map(children, (child, i) => (
            <Slide key={i}>{child}</Slide>
          ))}
        </Container>
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
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </>
      )}
    </Embla>
  );
};

export default EmblaCarouselComponent;
