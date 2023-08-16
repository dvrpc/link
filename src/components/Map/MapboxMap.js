import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { setupClick, clickClear } from './interaction.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA';

function MapboxMap() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-75.16, 39.95],
      zoom: 9
    });

    mapInstance.on("load", () => {
    // LOAD DATA: add vector tileset from DVRPC's server

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

      mapInstance.addLayer({
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
        // add layer before road intersection layer
        'road-label-simple'
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

      mapInstance.addLayer({
        id: "sw",
        type: "line",
        source: "sw_tile",
        "source-layer": "ped_lines",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "blue"
        },
      },
        'road-label-simple'
      );

      setupClick(mapInstance);
      clickClear(mapInstance);


      const tilesLoaded = mapInstance.areTilesLoaded();
      console.log(tilesLoaded)
    });
    
    setMap(mapInstance);

    // Clean up on component unmount
    return () => mapInstance.remove();

  }, []);


  return <div ref={mapContainer} className="map-container" />;
}



export default MapboxMap;