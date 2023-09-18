import React from "react";
import { Button } from "@mantine/core";

function AnalyzeButton({ draw }) {
  const analyzeData = () => {
    if (draw) {
      const allFeatures = draw.getAll();
      console.log(allFeatures);
    }
  };

  return (
    <Button
      style={{
        position: "absolute",
        top: "90px",
        left: "10px",
        zIndex: 10,
      }}
      onClick={analyzeData}
    >
      Analyze
    </Button>
  );
}

export default AnalyzeButton;
