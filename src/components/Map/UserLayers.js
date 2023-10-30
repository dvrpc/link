import React, { useEffect, useState, useRef } from "react";
import { useMap } from "./MapContext";

const AddLayer = ({ geojsonData }) => {
  const map = useMap();

  const layerConfig = {
    id: "user_lines",
    type: "line",
    source: {
      type: "geojson",
      data: { geojsonData },
    },
    paint: {
      "line-width": 2,
      "line-opacity": 1,
      "line-color": "green",
    },
  };

  useEffect(() => {
    if (map) {
      map.addLayer(layerConfig, "road-label-simple");
    }

    return () => {
      if (map && map.getLayer(layerConfig.id)) {
        map.removeLayer(layerConfig.id);
      }
    };
  }, [map, layerConfig]);

  return null;
};

export default AddLayer;
