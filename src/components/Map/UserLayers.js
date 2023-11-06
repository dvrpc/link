import React, { useEffect } from "react";
import { useMap } from "./MapContext";

const AddLayer = ({ geojsonData }) => {
  const map = useMap();
  const sourceId = "user_buffers";
  const layerId = "user_buffers";

  useEffect(() => {
    const addGeoJsonLayer = () => {
      if (!map.getLayer(layerId)) {
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
      }
    };

    if (!map || !geojsonData) return;

    if (map.isStyleLoaded()) {
      addGeoJsonLayer();
    } else {
      map.on("style.load", addGeoJsonLayer);
    }

    return () => {
      if (map && map.getStyle()) {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      }
    };
  }, [map, geojsonData, layerId, sourceId]);

  return null;
};

export default AddLayer;
