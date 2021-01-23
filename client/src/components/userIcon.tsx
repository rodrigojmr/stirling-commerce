import { Box, Center, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { requestLogin } from '../features/auth/userSlice';
import { RootState } from '../store/rootReducer';

const StyledBox = styled(Box)`
  &:hover {
    svg {
      stroke: white;
      fill: white;
    }
  }
`;

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user: ', user);

  return (
    <Center
      h={10}
      w={10}
      borderRadius="50%"
      bg="grey"
      mr={8}
      transition="all .2s"
      _hover={{ bg: 'primary.500' }}
      onClick={() =>
        dispatch(requestLogin({ username: 'asddasdas', password: 'dashdkass' }))
      }
    >
      <Icon
        as={UserIcon}
        fill="lighter-grey"
        stroke="lighter-grey"
        boxSize={6}
        transition="all .2s"
      />
    </Center>
  );
};

export default User;
