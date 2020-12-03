import styled from 'styled-components';
import { ReactComponent as Star } from '../../assets/star.svg';

export const StyledStar = styled(Star)<{ filled: boolean }>`
  stroke: none;
  width: 20px;
  height: 20px;
  fill: ${({ filled }) => (filled ? '#e69006' : '#a7a7a7')};
  margin-right: 5px;
`;

export const Stars = (num: number) => {
  const starArray = [];
  for (let i = 1; i <= 5; i++) {
    starArray.push(<StyledStar filled={i < num} />);
  }

  return starArray;
};
