import React from "react";
import { Button, Tooltip } from "@mantine/core";

function Explainer() {

  const openLink = () => {
    window.open('https://dvrpc.github.io/link-docs/', '_blank');
  }
  return (
    <>
      <Tooltip label="View the Getting Started guide, and other documentation!">
        <Button onClick={openLink} >Getting Started</Button>
      </Tooltip>
    </>
  );
}

export default Explainer;
