import React from "react";
import { Button } from "@mantine/core";

function AnalyzeButton({ draw }) {
  const analyzeData = () => {
    if (draw) {
      const allFeatures = draw.getAll();
      console.log(allFeatures);
    }
  };

  return <Button onClick={analyzeData}>Analyze</Button>;
}

export default AnalyzeButton;
