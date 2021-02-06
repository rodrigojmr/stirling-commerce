import styled from '@emotion/styled';
import { ReactComponent as Star } from '../../assets/star.svg';

// TODO Refactor as Functional Component?

export const StyledStar = styled(Star)<{ filled: string }>`
  stroke: none;
  width: 20px;
  height: 20px;
  fill: ${({ filled }) => (filled === 'true' ? '#e69006' : '#a7a7a7')};
  margin-right: 2px;
`;

// toString() due to React error warning
export const stars = (num: number) => {
  const starArray = [];
  for (let i = 1; i <= 5; i++) {
    starArray.push(<StyledStar key={i} filled={(i <= num).toString()} />);
  }

  return starArray;
};
