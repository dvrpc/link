import React, { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import drawInstance from "./MapboxDrawConfig";
import { MapContext } from "./MapContext";
import { GeoJSONUploadControl } from "./GeojsonButton";
import { SelectAllButton } from "./SelectAllButton";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

function MapboxMap({ setHasDrawings, setMap, connectionType, themeType, isLoading, setIsLoading }) {
  const mapContainer = useRef(null);
  const { updateDrawingState } = useContext(MapContext);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: themeType === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [-75.16, 40.05],
      zoom: 8.5,
    });

    mapInstance.on("load", () => {
      setIsLoading(true);
      const geoJSONControl = new GeoJSONUploadControl(updateDrawingState);
      mapInstance.addControl(geoJSONControl, "top-right");
      const selectAll = new SelectAllButton(drawInstance);
      mapInstance.addControl(selectAll, "top-right");
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

      if (connectionType === "bike") {
        mapInstance.addLayer(
          {
            id: "lts",
            type: "line",
            source: "lts_tile",
            "source-layer": "existing_conditions_lts",
            paint: {
              "line-width": 1,
              "line-opacity": {
                property: "lts_score",
                stops: [
                  [1, 1],
                  [2, 1],
                  [3, .75],
                  [4, .75],
                ],
              },
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
      } else if (connectionType === "pedestrian") {
        mapInstance.addLayer(
          {
            id: "sw",
            type: "line",
            source: "sw_tile",
            "source-layer": "ped_lines",
            paint: {
              "line-width": 1,
              "line-opacity": 1,
              "line-color": [
                "match",
                ["get", "feat_type"],
                "UNMARKED",
                "#FF0000",
                "#00A36C",
              ],
            },
          },
          "road-label-simple",
        );
      }

      mapInstance.addControl(drawInstance);

      if (drawInstance) {
        mapInstance.on("draw.create", updateDrawingState);
        mapInstance.on("draw.update", updateDrawingState);
        mapInstance.on("draw.delete", updateDrawingState);
      }
    });

    setMap(mapInstance);

    const onIdle = () => {
      setIsLoading(false);
    };
    mapInstance.on('idle', onIdle);


    return () => {
      mapInstance.off('idle', onIdle);
      if (drawInstance) {
        mapInstance.off("draw.create", updateDrawingState);
        mapInstance.off("draw.update", updateDrawingState);
        mapInstance.off("draw.delete", updateDrawingState);
      }
    };
  }, [setHasDrawings, setMap, connectionType, themeType]);
  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default MapboxMap;
