import React, { useState } from 'react';
import Toggle from './Toggle';
import { FlexApartWrapper, Heading } from './styled';
import { SwitchTransition } from 'react-transition-group';
import FadeTransition from './Animations/FadeTransition';
interface Props {
  title?: string;
  labels?: [string, string];
  children: [React.ReactNode, React.ReactNode];
}

const ToggleSlider: React.FC<Props> = ({ title, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <FlexApartWrapper>
        {title && (
          <Heading as="h1" fontSize="3rem">
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
      </FlexApartWrapper>
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
