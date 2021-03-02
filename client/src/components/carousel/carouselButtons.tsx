import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface DotProps {
  selected: boolean;
  onClick: () => void;
}

interface DotButtonProps {
  selected: boolean;
}

const Dot = styled.button<DotProps>`
  background-color: transparent;
  cursor: pointer;
  position: relative;
  padding: 0;
  width: ${({ selected }) => (selected ? '6rem' : '1rem')};
  height: 2rem;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  border: 0;
  display: flex;
  align-items: center;
  outline: none;
  transition: all 0.2s;

  &:focus::after {
    background-color: #19cd95;
  }

  &::after {
    background-color: #efefef;
    width: 100%;
    height: 1rem;
    content: '';
    transition: all 0.2s;
    border-radius: 1rem;
    /* primary on selected */
    background-color: ${props => (props.selected ? '#19cd95' : `#fff`)};
    opacity: 1;
  }
`;

export const DotButton = ({ selected, onClick }: DotProps) => (
  <Dot selected={selected} onClick={onClick} />
);

const sharedButtonStyles = css`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: 5.5rem;
  height: 5.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.2s;
  outline: none;

  &:not(:disabled) {
    cursor: pointer;
    fill: #fff;
  }
  &:hover:not(:disabled),
  &:focus {
    background-color: rgba(209, 209, 209, 0.411);
    fill: #89f2d2;
  }

  &:disabled {
    fill: #868686;
  }
`;

const ButtonPrev = styled.button`
  ${sharedButtonStyles}
  left: 3rem;
`;

const ButtonSvg = styled.svg`
  width: 2.2rem;
  height: 2.2rem;
`;

interface ButtonProps {
  enabled: boolean;
  onClick: () => void;
}

export const PrevButton = ({ enabled, onClick }: ButtonProps): JSX.Element => (
  <ButtonPrev onClick={onClick} disabled={!enabled}>
    <ButtonSvg viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </ButtonSvg>
  </ButtonPrev>
);

const ButtonNext = styled.button`
  ${sharedButtonStyles}
  right: 3rem;
`;

export const NextButton = ({ enabled, onClick }: ButtonProps): JSX.Element => (
  <ButtonNext onClick={onClick} disabled={!enabled}>
    <ButtonSvg viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </ButtonSvg>
  </ButtonNext>
);
