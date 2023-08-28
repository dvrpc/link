import React from "react";
import { Button } from "@mantine/core";

function ConnectionToggle({ connectionType, setConnectionType }) {
  const handleToggle = () => {
    setConnectionType((prevType) =>
      prevType === "bike" ? "pedestrian" : "bike",
    );
  };
  return (
    <Button onClick={handleToggle}>
      Switch to {connectionType === "bike" ? "Pedestrian" : "Bike"}
    </Button>
  );
}

export default ConnectionToggle;
