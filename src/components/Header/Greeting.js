import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Text } from '@mantine/core'

const Greeting = ({ style }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Text component="h3" style={{ color: 'white' }}>Hello, {user.nickname}! </Text>;
  } else {
    return <h3 style={style}>Please log in.</h3>;
  }
};

export default Greeting;
