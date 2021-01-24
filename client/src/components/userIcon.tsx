import { Box, Center, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { requestLogout } from '../features/auth/userSlice';
import { RootState } from '../store/rootReducer';

const StyledBox = styled(Box)`
  &:hover {
    svg {
      stroke: white;
      fill: white;
    }
  }
`;

interface Props {
  order: ChakraOrder;
}

const User = ({ order }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Center
      flexShrink={0}
      order={order}
      h={10}
      w={10}
      borderRadius="50%"
      bg="grey"
      mr={8}
      transition="all .2s"
      _hover={{ bg: 'primary.500' }}
      onClick={() => dispatch(requestLogout())}
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
