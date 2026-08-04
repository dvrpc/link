import React, { useContext } from "react";
import { Tooltip, Button } from "@mantine/core";
import { MapContext } from "../Map/MapContext";
import drawInstance from "../Map/MapboxDrawConfig";

function ClearButton({ disabled, resetDrawingState }) {
  const { map } = useContext(MapContext);

  const clearFeatures = () => {
    if (drawInstance && map) {
      drawInstance.deleteAll();
      console.log("deleted feature");
      const layersToRemove = ["user_geoms"];
      layersToRemove.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
          map.removeSource(layerId);
        }
      });
      console.log("After clear:", drawInstance.getAll()); // Check if features are indeed cleared
      resetDrawingState();
    }
  };

  return (
    <>
      <Tooltip label="Clear any studies off of the screen.">
        <Button
          variant="filled"
          color="blue"
          onClick={clearFeatures}
          disabled={disabled}
          style={{
            width: 120,
          }}
        >
          Clear
        </Button>
      </Tooltip>
    </>
  );
}

export default ClearButton;
