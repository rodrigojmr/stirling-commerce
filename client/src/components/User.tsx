import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/user/userSlice';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';

const StyledContainer = styled.div`
  padding: 1rem;
  border-radius: 50%;
  font-size: 0;
  background-color: ${({ theme }) => theme.colors.grey};
  margin-right: 2rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};

    svg {
      stroke: white;
      fill: white;
    }
  }
`;

const StyledIcon = styled(UserIcon)`
  fill: ${({ theme }) => theme.colors.lighterGrey};
  stroke: ${({ theme }) => theme.colors.lighterGrey};
  height: 3rem;
  width: 3rem;
  transition: all 0.2s;
`;

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state);
  console.log('user: ', user);

  return (
    <StyledContainer
      onClick={() =>
        dispatch(login({ username: 'asddasdas', password: 'dashdkass' }))
      }
    >
      <StyledIcon />
    </StyledContainer>
  );
};

export default User;
