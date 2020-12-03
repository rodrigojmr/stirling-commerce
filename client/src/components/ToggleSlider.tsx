import React, { useState } from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';
import ImagePoints from './ImagePoints';
import { Heading } from './styled';
import { motion, AnimatePresence } from 'framer-motion';

// TODO ToggleSliderr will take title, labels, and two products/components

const variants = {
  selected: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
};

interface Props {
  title?: string;
  labels?: [string, string];
  children: [React.ReactNode, React.ReactNode];
}

const ViewPort = styled.div<{ checked: boolean }>`
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  will-change: transform;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;

  & > *:first-child {
    transform: translateX(${({ checked }) => (checked ? '-100%' : '0%')});
  }

  & > *:last-child {
    transform: translateX(${({ checked }) => (checked ? '-100%' : '0%')});
  }
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  transition: all 0.5s;
  transition-timing-function: cubic-bezier(0.34, 0.54, 0.58, 0.99);
`;

const ToggleSlider: React.FC<Props> = ({ title, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        {title && (
          <Heading color="black" as="h1" fontSize="3rem">
            {title}
          </Heading>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <Toggle
            checked={isChecked}
            id="recommendedProduct"
            onChange={setIsChecked}
            optionLabels={['Men', 'Women']}
          />
        </div>
      </div>
      <ViewPort checked={isChecked}>
        {React.Children.map(children, (child, i) => (
          <Slide key={i}>{child}</Slide>
        ))}
      </ViewPort>
    </>
  );
};

export default ToggleSlider;
