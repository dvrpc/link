import React from "react";
import { Switch } from "@mantine/core";
import { IconWalk, IconBike } from '@tabler/icons-react';

function ConnectionToggle({
  connectionType,
  setConnectionType,
  resetDrawingState,
}) {


  const walkIcon = (
    <IconWalk
      stroke={2.5}
    />
  );

  const bikeIcon = (
    <IconBike
      stroke={2.5}
    />
  );


  const handleToggle = () => {
    const newType = connectionType === "bike" ? "pedestrian" : "bike";
    setConnectionType(newType);
    resetDrawingState();
  };

  return (
    <Switch
      checked={connectionType === "pedestrian"}
      onChange={handleToggle}
      onLabel={walkIcon} offLabel={bikeIcon}
      size="xl"
      color="gray"
    />
  );
}

export default ConnectionToggle;
