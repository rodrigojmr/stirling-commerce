import React from 'react';
import styled from '@emotion/styled';
import { Box, Input, Text } from '@chakra-ui/react';

const Wrapper = styled.div`
  position: relative;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;

  > *:first-of-type {
    margin-right: 1.8rem;
  }
  > *:last-child {
    margin-left: 1.8rem;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 6rem;
  font-size: 0;
  padding: 5px;
  border: 3px solid black;
  border-radius: 3rem;
  outline: none;
  &:focus,
  &:active {
    filter: brightness(1.3);
    box-shadow: 0px 0px 15px 7px #78b2ff;
  }
`;

const SwitchWrapper = styled.div<{ checked: boolean }>`
  width: 100%;
  height: 1.6rem;
  transition: 0.25s all ease-in-out;
  transform: ${({ checked }) => `translateX(${checked ? '100%' : '0%'})`};
`;

const StyledSwitch = ({ checked }: { checked: boolean }) => (
  <Box
    as="span"
    display="inline-block"
    width="2.2rem"
    height="1.6rem"
    borderRadius="2rem"
    bg="primary.500"
    transition="0.25s all ease-in-out"
    transform={checked ? 'translateX(-100%)' : 'translateX(0%)'}
  ></Box>
);
const OptionLabel = styled.p`
  font-family: 'Bebas Neue';
  font-size: 2rem;
  color: black;
`;

interface Props {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  optionLabels: readonly [string, string];
}

const Toggle: React.FC<Props> = ({ id, checked, onChange, optionLabels }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log(e);
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked);
  };

  return (
    <ToggleWrapper>
      <Text fontSize="xl" fontWeight="600" fontFamily="heading">
        {optionLabels[1]}
      </Text>
      <Wrapper>
        <Input
          type="checkbox"
          style={{ display: 'none' }}
          id={id}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        {id ? (
          <StyledLabel
            className="toggle-switch-label"
            tabIndex={0}
            onKeyDown={e => handleKeyPress(e)}
            htmlFor={id}
          >
            <SwitchWrapper checked={checked}>
              <StyledSwitch checked={checked} />
            </SwitchWrapper>
          </StyledLabel>
        ) : null}
      </Wrapper>
      <Text fontSize="xl" fontWeight="600" fontFamily="heading">
        {optionLabels[1]}
      </Text>
    </ToggleWrapper>
  );
};

export default Toggle;
