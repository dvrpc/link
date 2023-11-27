import React, { useState } from "react";
import { Button } from "@mantine/core";

function ClearButton({ draw, disabled }) {
  const clearFeatures = async () => {
    if (draw) {
      draw.deleteAll();
    }

    return (
      <Button
        style={{
          position: "absolute",
          top: "130px",
          left: "10px",
          zIndex: 11,
        }}
        onClick={clearFeatures}
        disabled={disabled}
      >
        Clear
      </Button>
    );
  };
}
export default ClearButton;
