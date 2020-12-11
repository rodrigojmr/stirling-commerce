import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/user';

const StyledContainer = styled.div`
  padding: 1rem;
  border-radius: 50%;
  font-size: 0;
  background-color: ${({ theme }) => theme.colors.grey};
  margin-right: 2rem;
`;

const StyledIcon = styled(UserIcon)`
  fill: ${({ theme }) => theme.colors.lighterGrey};
  stroke: ${({ theme }) => theme.colors.lighterGrey};
  height: 3rem;
  width: 3rem;
`;

const User = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
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
