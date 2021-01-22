import React, { useState } from 'react';
import Toggle from './toggle';
import { Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Heading } from '@chakra-ui/react';
import { SwitchTransition } from 'react-transition-group';
import FadeTransition from './animations/fadeTransition';
interface Props {
  title?: string;
  labels?: [string, string];
  children: [React.ReactNode, React.ReactNode];
}

const ToggleSlider: React.FC<Props> = ({ title, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <Flex alignItems="center" justify="space-between">
        {title && (
          <Heading as="h1" fontSize="3xl">
            {title}
          </Heading>
        )}
        <Toggle
          checked={isChecked}
          id="recommendedProduct"
          onChange={setIsChecked}
          optionLabels={['Men', 'Women']}
        />
      </Flex>
      <SwitchTransition mode="out-in">
        <FadeTransition
          key={isChecked ? 'firstComponent' : 'secondComponent'}
          timeout={100}
        >
          {isChecked ? children[1] : children[0]}
        </FadeTransition>
      </SwitchTransition>
    </>
  );
};

export default ToggleSlider;
