import React from "react";
import { Button } from "@mantine/core";

function AnalyzeButton({ segids }) {
  const buttonClick = () => {
    // here's where i want to make a request to the api with seg ids.
    console.log("click click i'm a button");
  };
  return (
    <Button color="green" radius="lg" onClick={buttonClick}>
      Analyze Segments
    </Button>
  );
}

export default AnalyzeButton;
