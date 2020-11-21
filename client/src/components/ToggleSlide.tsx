import React, { useState } from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';
import { Heading } from '../components/styled';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

interface Props {
  title?: string;
}

const ToggleSlide: React.FC<Props> = ({ title }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Heading color="black" as="h1" fontSize="3rem">
        {title}
      </Heading>
      <div style={{ marginLeft: 'auto', display: 'flex' }}>
        <Toggle
          checked={isChecked}
          id="recommendedProduct"
          onChange={setIsChecked}
          optionLabels={['Men', 'Women']}
        />
      </div>
    </div>
  );
};

export default ToggleSlide;
