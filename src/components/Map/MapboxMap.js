import React, { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import drawInstance from "./MapboxDrawConfig";
import { MapContext } from "./MapContext";
import { GeoJSONUploadControl } from "./GeojsonButton";
import { SelectAllButton } from "./SelectAllButton";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

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
        url: "https://www.tiles.dvrpc.org/data/lts_v2.json",
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
            "source-layer": "lts",
            paint: {
              "line-width": 1,
              "line-opacity": {
                property: "lts",
                stops: [
                  [1, 1],
                  [2, 1],
                  [3, .75],
                  [4, .75],
                ],
              },
              "line-color": {
                property: "lts",
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

    function isDrawingLine() {
      return drawInstance.getMode() === 'draw_line_string';
    }

    mapInstance.on('click', 'lts', (e) => {
      if (!isDrawingLine()) {
        const coordinates = e.lngLat;
        const properties = e.features[0].properties;

        const propertyLabels = {
          "id": "ID",
          "no": "Number",
          "fromnodeno": "From Node Number",
          "tonodeno": "To Node Number",
          "typeno": "Type Number",
          "length": "Length (km)",
          "totnumla~1": "Total Number Lanes",
          "bike_fac~2": "Bike Facility",
          "vcur_prt~3": "vcur",
          "wktpolyw~4": "Geometry",
          "rise_run": "Rise/Run",
          "isoneway~5": "Is One Way",
          "reversel~6": "Reverse Length",
          "penndot_speed": "PennDOT Speed",
          "njdot_speed": "NJDOT Speed",
          "lts": "LTS level"
        };

        const bikeFacilities = [
          "None",
          "Sharrow",
          "Bicycle lane",
          "Buffered bicycle lane",
          "Off-road trail/path",
          "Bicycle route",
          "Protected bicycle lane"
        ]
        Object.assign(properties, { "bike_fac~2": bikeFacilities[properties['bike_fac~2']]});

        const propertiesToOmit = ["id", "no", "vcur_prt~3", "wktpolyw~4", "reversel~6", "typeno"];

        const popupContent = Object.keys(properties)
          .filter(key => !propertiesToOmit.includes(key))
          .map(key => {
            const label = propertyLabels[key] || key;
            return `<strong>${label}:</strong> ${properties[key]}`;
          })
          .join('<br>');

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div style="color: black;">${popupContent}</div>`)
          .addTo(mapInstance);
      }
    });

    mapInstance.on('mouseenter', 'lts', () => {
      mapInstance.getCanvas().style.cursor = 'pointer';
    });

    mapInstance.on('mouseleave', 'lts', () => {
      mapInstance.getCanvas().style.cursor = '';
    });
    mapInstance.on('click', 'sw', (e) => {
      if (!isDrawingLine()) {
        const coordinates = e.lngLat;
        const properties = e.features[0].properties;
        const propertyLabels = {
          "line_type": "Line Type",
          "material": "Material",
          "feat_type": "Feature Type",
          "raised": "Raised",
          "county": "County",
        };

        const propertiesToOmit = [];

        const popupContent = Object.keys(properties)
          .filter(key => !propertiesToOmit.includes(key))
          .map(key => {
            const label = propertyLabels[key] || key;
            return `<strong>${label}:</strong> ${properties[key]}`;
          })
          .join('<br>');

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<div style="color: black;">${popupContent}</div>`)
          .addTo(mapInstance);
      }
    });

    mapInstance.on('mouseenter', 'sw', () => {
      mapInstance.getCanvas().style.cursor = 'pointer';
    });

    mapInstance.on('mouseleave', 'sw', () => {
      mapInstance.getCanvas().style.cursor = '';
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
