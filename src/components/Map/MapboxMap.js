import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { setupClick, clickClear } from "./interaction.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

function MapboxMap({ connectionType }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-75.16, 40.07],
      zoom: 8.5,
    });

    const setupLayers = () => {
      if (mapInstance.getLayer("lts") || mapInstance.getLayer("sw")) return;

      if (connectionType === "bike") {
        mapInstance.addLayer(
          {
            id: "lts",
            type: "line",
            source: "lts_tile",
            "source-layer": "existing_conditions_lts",
            paint: {
              "line-width": 2,
              "line-opacity": 1,
              "line-color": {
                property: "lts_score",
                stops: [
                  [1, "green"],
                  [2, "light green"],
                  [3, "yellow"],
                  [4, "red"],
                ],
              },
            },
          },
          "road-label-simple",
        );
        mapInstance.addLayer({
          id: "clicked",
          type: "line",
          source: "lts_tile",
          "source-layer": "existing_conditions_lts",
          paint: {
            "line-width": 15,
            "line-opacity": [
              "case",
              ["boolean", ["feature-state", "click"], false],
              0.7,
              0,
            ],
            "line-color": "white",
          },
        });
      } else if (connectionType === "pedestrian") {
        mapInstance.addLayer(
          {
            id: "sw",
            type: "line",
            source: "sw_tile",
            "source-layer": "ped_lines",
            paint: {
              "line-width": 2,
              "line-opacity": 1,
              "line-color": "darkslategrey",
            },
          },
          "road-label-simple",
        );
      }

      setupClick(mapInstance);
      clickClear(mapInstance);
    };

    mapInstance.on("load", () => {
      mapInstance.addSource("lts_tile", {
        type: "vector",
        url: "https://www.tiles.dvrpc.org/data/lts.json",
        minzoom: 8,
        promoteId: "id",
      });

      mapInstance.addSource("sw_tile", {
        type: "vector",
        url: "https://www.tiles.dvrpc.org/data/pedestrian-network.json",
        minzoom: 8,
      });

      setupLayers();
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [connectionType]);

  return <div ref={mapContainer} className="map-container" />;
}

export default MapboxMap;
