import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Greeting = ({ style }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <h3 style={style}>Hello, {user.nickname}! </h3>;
  } else {
    return <h3 style={style}>Please log in.</h3>;
  }
};

export default Greeting;
