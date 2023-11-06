import React, { useEffect } from "react";
import { useMap } from "./MapContext";
import bbox from "@turf/bbox";

const AddLayer = ({ geojsonData }) => {
  const map = useMap();
  const sourceId = "user_geoms";
  const layerId = "user_geoms";

  useEffect(() => {
    const addGeoJsonLayer = () => {
      if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(geojsonData);
      } else {
        map.addSource(sourceId, {
          type: "geojson",
          data: geojsonData,
        });
      }

      if (!map.getLayer(layerId)) {
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

      const bounds = bbox(geojsonData);

      map.fitBounds(bounds, { padding: 20 });
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
  }, [map, geojsonData]);

  return null;
};

export default AddLayer;
