import React, { useState, useEffect, useCallback, cloneElement } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import styled from 'styled-components';
import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons';

const Embla = styled.div`
  position: relative;
`;

const Viewport = styled(({ component, ...props }) =>
  cloneElement(component, props)
)`
  overflow: hidden;

  &.is-draggable {
    cursor: move;
    cursor: grab;
  }

  &.is-dragging {
    cursor: grabbing;
  }
`;

const Container = styled.div`
  display: flex;
  will-change: transform;
  margin-left: -1rem;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: 80%;
  position: relative;
  padding-left: 1rem;
  counter-increment: embla;
`;

const SlideInner = styled.div`
  background-color: rgb(40, 44, 52);
  position: relative;
  border-radius: 0.5rem;
  min-height: 200px;
  padding-bottom: 46%;
  font-size: 5rem;

  &::before {
    color: white;
    font-weight: 300;
    line-height: 1;
    content: counter(embla);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Dots = styled.div`
  position: absolute;
  margin-top: 1rem;
  display: flex;
  list-style: none;
  padding-left: 0;
  justify-content: center;
  left: 0;
  right: 0;
  top: 100%;
`;

interface CarouselProps {
  options: {
    loop: boolean;
    draggable: boolean;
  };
  children: React.ReactNode;
}

const EmblaCarouselComponent: React.FC<CarouselProps> = ({
  options,
  children
}) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  let scrollTo: (index: number) => void,
    scrollPrev: () => void,
    scrollNext: () => void;
  if (embla) {
    scrollTo = useCallback(index => embla.scrollTo(index), [embla]);
    scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
    scrollNext = useCallback(() => embla.scrollNext(), [embla]);
  }

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

  return (
    <Embla>
      <Viewport component={EmblaCarouselReact}>
        <Container>
          {children.map((child: React.ReactChild, i: number) => (
            <Slide key={i}>
              <SlideInner>{child}</SlideInner>
            </Slide>
          ))}
        </Container>
      </Viewport>
      <Dots>
        {scrollSnaps.map((snap, index) => (
          <DotButton
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            key={index}
          />
        ))}
      </Dots>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Embla>
  );
};

export default EmblaCarouselComponent;
