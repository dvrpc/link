import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA';

function MapboxMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-75.16);
  const [lat, setLat] = useState(39.95);
  const [zoom, setZoom] = useState(9);

  
  useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/dvrpcomad/cks6eiqga0tmc17p3ecw7ij53',
          center: [lng, lat],
          zoom: zoom
        });
  }, [lng, lat, zoom]);

  return <div ref={mapContainer} className="map-container" />;
}



export default MapboxMap;