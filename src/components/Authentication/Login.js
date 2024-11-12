import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Tooltip, Button } from "@mantine/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Tooltip label="Login to LINK!">
        <Button
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
      </Tooltip>
    </>
  );
};

export default LoginButton;
