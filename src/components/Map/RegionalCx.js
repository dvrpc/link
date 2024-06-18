import React, { useEffect, useRef, useState } from "react";
import RegionalHeader from "./RegionalHeader"
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

function RegionalCx({ themeType, isLoading, setIsLoading }) {
  const mapContainer = useRef(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const counties = ['DVRPC Region (All Counties)', 'Bucks', 'Burlington', 'Camden', 'Chester', 'Delaware', 'Gloucester', 'Mercer', 'Montgomery', 'Philadelphia']
  const attributes = ['Total Population', 'Disabled', 'Ethnic Minority', 'Female', 'Foreign Born', 'Limited English Proficiency (LEP)', 'Low Income', 'Older Adult', 'Racial Minority', 'Youth', 'Total Jobs']
  const [currentCounty, setCurrentCounty] = useState('DVRPC Region (All Counties)');
  const [currentAttribute, setCurrentAttribute] = useState('Total Population')

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch('./for_mapbox.geojson');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGeojsonData(data);
        console.log(geojsonData);
      } catch (error) {
        console.error('Error loading GeoJSON:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: themeType === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [-75.16, 40.05],
      zoom: 8.5,
    });

    mapInstance.on("load", () => {
      if (geojsonData) {
        mapInstance.addSource("regional", {
          type: "geojson",
          data: geojsonData
        });
        mapInstance.addLayer(
          {
            id: "region",
            type: "line",
            source: "regional",
            paint: {
              "line-width": 1,
              "line-color": "blue"
            },
          },
          "road-label-simple",
        );
      }
    });

  }, [themeType, geojsonData, currentCounty, currentAttribute]);

  return (
    <>
      <RegionalHeader counties={counties} attributes={attributes} setCurrentCounty={setCurrentCounty} setCurrentAttribute={setCurrentAttribute} />
      <div
        ref={mapContainer}
        className="regional-map-container"
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}

export default RegionalCx;