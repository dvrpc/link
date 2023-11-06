import React, { useEffect } from "react";
import { useMap } from "./MapContext";

const AddLayer = ({ geojsonData }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !geojsonData) return;

    const sourceId = "user_buffers";
    const layerId = "user_buffers";

    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }
    map.addSource(sourceId, {
      type: "geojson",
      data: geojsonData,
    });

    map.addLayer({
      id: layerId,
      type: "fill",
      source: sourceId,
      paint: {
        "fill-color": "green",
        "fill-opacity": 0.5,
      },
    });

    return () => {
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
      }
    };
  }, [map, geojsonData]);

  return null;
};

export default AddLayer;
