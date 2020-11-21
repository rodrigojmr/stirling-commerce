import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
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

const StyledSwitch = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 3.5rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: 0.2s all;
  transform: ${({ checked }) => `translateX(${checked ? '100%' : '0%'})`};
`;

interface Props {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  optionLabels: readonly [string, string];
}

const Toggle: React.FC<Props> = ({ id, checked, onChange, optionLabels }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key !== 'Space') return;

    e.preventDefault();
    onChange(!checked);
  };

  return (
    <>
      {optionLabels[0]}
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
            tabIndex={1}
            onKeyDown={e => handleKeyPress(e)}
            htmlFor={id}
          >
            <StyledSwitch checked={checked} />
          </StyledLabel>
        ) : null}
      </Wrapper>
      {optionLabels[1]}
    </>
  );
};

export default Toggle;
