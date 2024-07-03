import React, { useEffect, useRef, useState } from "react";
import RegionalHeader from "./RegionalHeader"
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const RegionalCx = ({ themeType, isLoading, setIsLoading }) => {
  const mapContainer = useRef(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const counties = ['DVRPC Region (All Counties)', 'Bucks', 'Burlington', 'Camden', 'Chester', 'Delaware', 'Gloucester', 'Mercer', 'Montgomery', 'Philadelphia'];
  const attributes = ['total_pop', 'disabled', 'ethnic_minority', 'female', 'foreign_born', 'lep', 'low_income', 'older_adult', 'racial_minority', 'youth', 'total_jobs'];
  const [currentCounty, setCurrentCounty] = useState('DVRPC Region (All Counties)');
  const [currentAttribute, setCurrentAttribute] = useState('total_pop');
  const [maxOfAttribute, setMaxOfAttribute] = useState(-Infinity);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch('./for_mapbox.geojson');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGeojsonData(data);
        const max = data.features.reduce((max, feature) => {
          if (!currentCounty || currentCounty === 'DVRPC Region (All Counties)' || feature.properties.co_name === currentCounty) {
            return Math.max(max, feature.properties[currentAttribute]);
          }
          return max;
        }, -Infinity);
        setMaxOfAttribute(max);
        console.log('Max attribute value:', max);
      } catch (error) {
        console.error('Error loading GeoJSON:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  useEffect(() => {
    if (geojsonData) {
      const max = geojsonData.features.reduce((max, feature) => {
        if (!currentCounty || currentCounty === 'DVRPC Region (All Counties)' || feature.properties.co_name === currentCounty) {
          return Math.max(max, feature.properties[currentAttribute]);
        }
        return max;
      }, -Infinity);
      setMaxOfAttribute(max);
      console.log('Max attribute value:', max);
    }
  }, [geojsonData, currentAttribute, currentCounty]);

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

        const values = geojsonData.features
          .filter(feature => !currentCounty || currentCounty === 'DVRPC Region (All Counties)' || feature.properties.co_name === currentCounty)
          .map(feature => feature.properties[currentAttribute])
          .filter(value => value !== null && value !== undefined)
          .sort((a, b) => a - b);

        const quantiles = Array.from({ length: 5 }, (_, i) => {
          const index = Math.floor((i + 1) * values.length / 5) - 1;
          return values[index];
        });
        console.log('Quantiles:', quantiles);
        const colors = [
          '#0000ff', // Blue
          '#8000ff', // Purple-Blue
          '#bf40ff', // Light Purple
          '#ff80ff', // Light Pink
          '#ffffff'  // Pink
        ];
        const colorStops = quantiles.map((quantile, index) => [quantile, colors[index]]);
        console.log('Color Stops:', colorStops);

        mapInstance.addLayer(
          {
            id: "region",
            type: "line",
            source: "regional",
            paint: {
              "line-width": 2,
              "line-color": {
                property: currentAttribute,
                stops: colorStops,
              },
            },
          },
          "road-label-simple",
        );

        if (mapInstance.getLayer('region')) {
          if (currentCounty !== 'DVRPC Region (All Counties)') {
            mapInstance.setFilter('region', ['==', ['get', 'co_name'], currentCounty]);
          } else {
            mapInstance.setFilter('region', null);
          }
        }

        mapInstance.on('click', 'region', (e) => {
          const coordinates = e.lngLat;
          const properties = e.features[0].properties;
          const popupContent = Object.keys(properties)
            .map(key => `<strong>${key}:</strong> ${properties[key]}`)
            .join('<br>');

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<div style="color: black;">${popupContent}</div>`)
            .addTo(mapInstance);
        });

        mapInstance.on('mouseenter', 'region', () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });

        mapInstance.on('mouseleave', 'region', () => {
          mapInstance.getCanvas().style.cursor = '';
        });
      }
    });

    return () => mapInstance.remove();
  }, [themeType, geojsonData, currentCounty, currentAttribute, maxOfAttribute]);
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
