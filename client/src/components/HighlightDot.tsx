import React, { useEffect, useRef, useState } from 'react';
import { SwitchTransition } from 'react-transition-group';
import styled from 'styled-components';
import { Text } from './styled';
import FadeTransition from './Animations/FadeTransition';

interface Position {
  x: string;
  y: string;
}

interface Description {
  text: string;
}

type Props = Position & Description;

const Container = styled.div<Position>`
  position: absolute;
  top: ${({ y }) => y};
  left: ${({ x }) => x};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(102, 102, 102, 0.5);
  outline: none;
  transition: all 0.2s;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.primary};

    &::before {
      background-color: black;
    }
  }

  &::before {
    content: '';
    display: block;
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s;
  }

  &::after {
    content: '';
    display: block;
    width: 10%;
    height: 10%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: white;
  }
`;

const ToolTip = styled.div`
  position: absolute;
  bottom: 150%;
  left: -175%;
  padding: 12px;
  border-radius: 5px;
  width: 450%;
  height: 60px;
  background-color: rgba(23, 23, 23, 0.8);
  color: white;
  z-index: 1;
  text-overflow: clip;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 15px 0 15px;
    border-color: rgba(23, 23, 23, 0.8) transparent transparent transparent;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: initial;
`;

const HighlightDot: React.FC<Props> = ({ x, y, text }) => {
  const [selected, setSelected] = useState(false);

  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ref?.current.addEventListener('focus', () => setSelected(true));
    ref?.current.addEventListener('blur', () => setSelected(false));
  }, []);

  return (
    <Container
      ref={ref}
      tabIndex={0}
      x={x}
      y={y}
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
    >
      <SwitchTransition mode="out-in">
        <FadeTransition key={selected ? 'toolTip' : 'null'} timeout={0}>
          {selected ? (
            <ToolTip>
              <TextContainer>
                <Text fontWeight={600} fontSize="1.3rem">
                  {text}
                </Text>
              </TextContainer>
            </ToolTip>
          ) : null}
        </FadeTransition>
      </SwitchTransition>
    </Container>
  );
};

export default HighlightDot;
