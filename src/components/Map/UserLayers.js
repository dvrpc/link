import React, { useEffect, useContext } from "react";
import { MapContext } from "./MapContext";
import bbox from "@turf/bbox";

const AddLayer = ({ geojsonData, connectionType }) => {
  const { map } = useContext(MapContext);
  const sourceId = "user_geoms";
  const layerId = "user_geoms";

  useEffect(() => {
    if (!map || !geojsonData) return;

    // Check if 'isochrones' exists
    const isochronesExists = geojsonData.features.some(
      (feature) => feature.id === "isochrones" && feature.geometry !== null,
    );

    // Filter out 'blobs' if 'isochrones' exists, ie remove philly island
    const filteredGeoJson = {
      ...geojsonData,
      features: geojsonData.features.filter((feature) => {
        if (isochronesExists) {
          return feature.id !== "blobs";
        }
        return feature.id !== "isochrones";
      }),
    };

    console.log("Filtered GeoJSON:", filteredGeoJson);

    const addGeoJsonLayer = () => {
      if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(filteredGeoJson);
      } else {
        map.addSource(sourceId, {
          type: "geojson",
          data: filteredGeoJson,
        });
      }
      const beforeLayerId = connectionType === "bike" ? "lts" : "sw";

      if (!map.getLayer(layerId)) {
        map.addLayer(
          {
            id: layerId,
            type: "fill",
            source: sourceId,
            paint: {
              "fill-color": "#60e0b1",
              "fill-opacity": 0.5,
            },
          },
          beforeLayerId,
        );
      }

      const bounds = bbox(filteredGeoJson);
      map.fitBounds(bounds, { padding: { top: 10, bottom: 400, left: 10, right: 0 } });
    };

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
