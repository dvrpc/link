import React from "react";
import { Button } from "@mantine/core";

function ConnectionToggle({
  connectionType,
  setConnectionType,
  resetDrawingState,
}) {
  const handleToggle = () => {
    const newType = connectionType === "bike" ? "pedestrian" : "bike";
    setConnectionType(newType);
    resetDrawingState();
  };

  return (
    <Button onClick={handleToggle}>
      Switch to {connectionType === "bike" ? "Pedestrian" : "Bike"}
    </Button>
  );
}

export default ConnectionToggle;
