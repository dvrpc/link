import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="gradient"
      gradient={{ from: "blue", to: "cyan", deg: 90 }}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
