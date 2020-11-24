import React from "react";
import styled from "styled-components";
import { ReactComponent as UserIcon } from "../assets/user.svg";

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

const User = (user: { username?: string }) => {
  return (
    <StyledContainer>
      <StyledIcon />
    </StyledContainer>
  );
};

export default User;
