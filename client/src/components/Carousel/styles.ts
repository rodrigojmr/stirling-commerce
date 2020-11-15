import styled from 'styled-components';

export const Embla = styled.section`
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

export const Container = styled.ul`
  display: flex;
  will-change: transform;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  list-style-type: none;
`;
