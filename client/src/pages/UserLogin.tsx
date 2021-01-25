import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Box } from '@chakra-ui/react';
import { Redirect, useLocation } from 'react-router-dom';
interface stateType {
  from: { pathname: string };
}

const UserLogin = () => {
  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  const { state } = useLocation<stateType>();

  if (redirectToReferrer) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <Grid>
      <Box></Box>
      <Box bg="assets/lifter"></Box>
    </Grid>
  );
};

export default UserLogin;
