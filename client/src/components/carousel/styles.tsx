import styled from '@emotion/styled';

export const Embla = styled.div`
  position: relative;
`;

export const Viewport = styled.div<{
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

export const CarouselContainer = styled.ul`
  width: 100%;
  display: flex;
  will-change: transform;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  list-style-type: none;
`;

export const Slide = styled.li<{ slides: number }>`
  position: relative;
  flex: 0 0 25%;
  &:not(:last-child) {
    padding-right: 2rem;
  }
  /* min-width: 25%;
  max-width: 33rem; */
`;
