import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;

  > *:first-child {
    margin-right: 1.8rem;
  }
  > *:last-child {
    margin-left: 1.8rem;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 9rem;
  font-size: 0;
  padding: 5px;
  border: 3px solid black;
  border-radius: 3rem;
  outline: none;
  &:focus {
    filter: brightness(1.3);
  }
`;

const SwitchWrapper = styled.div<{ checked: boolean }>`
  width: 100%;
  height: 2.5rem;
  transition: 0.2s all;

  transform: ${({ checked }) => `translateX(${checked ? '100%' : '0%'})`};
`;

const StyledSwitch = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 3.5rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: 0.2s all;

  transform: ${({ checked }) => `translateX(${checked ? '-100%' : '0%'})`};
`;

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
      <OptionLabel>{optionLabels[0]}</OptionLabel>
      <Wrapper>
        <input
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
      <OptionLabel>{optionLabels[1]}</OptionLabel>
    </ToggleWrapper>
  );
};

export default Toggle;
