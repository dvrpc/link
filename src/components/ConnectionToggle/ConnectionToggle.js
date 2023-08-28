import React from "react";
import { Button } from "@mantine/core";

function ConnectionToggle({ connectionType, setConnectionType }) {
  const handleToggle = () => {
    const newType = connectionType === "bike" ? "pedestrian" : "bike";
    setConnectionType(newType);
  };

  return <Button onClick={handleToggle}>Toggle Connection Type</Button>;
}

export default ConnectionToggle;
