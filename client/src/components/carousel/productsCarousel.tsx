import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect
} from 'react';
import styled from '@emotion/styled';
import { PrevButton, NextButton } from './carouselButtons';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Embla, Viewport, CarouselContainer, Slide } from './styles';
import ProductSlide from './carouselProduct';
import { useMediaQuery } from '@chakra-ui/react';

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
const ProgressBar = styled.div<{
  progress: number;
  slides: number;
  parentWidth: number;
}>`
  position: absolute;
  background-color: #1bcacd;
  top: 0;
  bottom: 0;
  ${({ progress, slides, parentWidth }) => {
    const width = parentWidth * (4 / slides);
    const left = (parentWidth - width) * (progress / 100);
    return `
      width: ${width}px;
      transform: translateX(${left}px)
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
  products: Product[];
}> = ({ options, products }) => {
  const [emblaRef, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const progressBar = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (progressBar.current !== null) {
      setProgressBarWidth(progressBar.current.clientWidth);
    }
  }, [progressBar]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (!embla) return;
    // onSelect();
    // onScroll();
    embla.on('select', onSelect);
    embla.on('scroll', onScroll);
  }, [embla, onSelect, onScroll]);

  const [
    isLargerThan1280,
    isLargerThan768px,
    isLargerThan600px
  ] = useMediaQuery([
    '(min-width: 1280px)',
    '(min-width: 768px)',
    '(min-width:600px)'
  ]);

  const slides = isLargerThan1280
    ? 4
    : isLargerThan768px
    ? 3
    : isLargerThan600px
    ? 2
    : 1;

  return (
    <>
      <Embla>
        <Viewport ref={emblaRef}>
          <CarouselContainer>
            {products.map((product, i) => (
              <Slide key={i} slides={slides}>
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
      <Progress ref={progressBar}>
        <ProgressBar
          parentWidth={progressBarWidth}
          progress={scrollProgress}
          slides={products.length}
        />
      </Progress>
    </>
  );
};

export default ProductsCarousel;
