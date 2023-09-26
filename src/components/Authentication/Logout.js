import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

const Logout = ({ style }) => {
  const { logout } = useAuth0();

  return (
    <Button
      style={style}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default Logout;
