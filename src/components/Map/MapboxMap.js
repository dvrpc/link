import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

function MapboxMap({ setDraw, connectionType }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-75.16, 40.05],
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
              "line-color": "#00A36C",
            },
          },
          "road-label-simple",
        );
        mapInstance.addLayer({
          id: "clicked",
          type: "line",
          source: "sw_tile",
          "source-layer": "ped_lines",
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
      }
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

      const drawInstance = new MapboxDraw({
        displayControlsDefault: false,
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
          line_string: true,
          trash: true,
        },
        defaultMode: "draw_line_string",
        styles: [
          // ACTIVE (being drawn)
          // line stroke
          {
            id: "gl-draw-line",
            type: "line",
            filter: [
              "all",
              ["==", "$type", "LineString"],
              ["!=", "mode", "static"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#40E0D0",
              "line-dasharray": [0.2, 2],
              "line-width": 2,
            },
          },
          // vertex point halos
          {
            id: "gl-draw-polygon-and-line-vertex-halo-active",
            type: "circle",
            filter: [
              "all",
              ["==", "meta", "vertex"],
              ["==", "$type", "Point"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 5,
              "circle-color": "#FFF",
            },
          },
          // vertex points
          {
            id: "gl-draw-polygon-and-line-vertex-active",
            type: "circle",
            filter: [
              "all",
              ["==", "meta", "vertex"],
              ["==", "$type", "Point"],
              ["!=", "mode", "simple_select"],
            ],
            paint: {
              "circle-radius": 3,
              "circle-color": "#D20C0C",
            },
          },

          // INACTIVE (static, already drawn)
          // line stroke
          {
            id: "gl-draw-line-static",
            type: "line",
            filter: [
              "all",
              ["==", "$type", "LineString"],
              ["==", "mode", "simple_select"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#4682B4",
              "line-width": 3,
            },
          },
          // polygon fill
          {
            id: "gl-draw-polygon-fill-static",
            type: "fill",
            filter: [
              "all",
              ["==", "$type", "Polygon"],
              ["==", "mode", "static"],
            ],
            paint: {
              "fill-color": "#000",
              "fill-outline-color": "#000",
              "fill-opacity": 0.1,
            },
          },
          // polygon outline
          {
            id: "gl-draw-polygon-stroke-static",
            type: "line",
            filter: [
              "all",
              ["==", "$type", "Polygon"],
              ["==", "mode", "static"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#000",
              "line-width": 3,
            },
          },
        ],
      });
      // ... your options

      // Use setDraw function to update draw instance in parent component
      setDraw(drawInstance);

      // Add draw controls to the map
      mapInstance.addControl(drawInstance);

      setupLayers();
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [setDraw, connectionType]);

  return <div ref={mapContainer} className="map-container" />;
}

export default MapboxMap;
