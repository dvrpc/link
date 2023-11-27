import React, { useContext } from "react";
import { Button } from "@mantine/core";
import { MapContext } from "../Map/MapContext";

function ClearButton({ draw, disabled }) {
  const map = useContext(MapContext);

  const clearFeatures = () => {
    if (draw && map) {
      draw.deleteAll();
      const layersToRemove = ["user_geoms"];
      layersToRemove.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
          map.removeSource(layerId);
        }
      });
    }
  };

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
}

export default ClearButton;
