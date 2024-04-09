import React from "react";
import { Button, } from "@mantine/core";

function Explainer() {

  const openLink = () => {
    window.open('https://dvrpc.github.io/link-docs/', '_blank');
  }
  return (
    <>
      <Button onClick={openLink} >Getting Started</Button>
    </>
  );
}

export default Explainer;
