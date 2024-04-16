import React, { useContext } from "react";
import { Button } from "@mantine/core";
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
    <Button
      style={{
        position: "absolute",
        top: "150px",
        left: "10px",
        zIndex: 11,
      }}
      onClick={clearFeatures}
      disabled={disabled}
    >
      Clear
    </Button>
  );
}

export default ClearButton;
