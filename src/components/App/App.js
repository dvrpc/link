import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import logo from './assets/dvrpc_white_logo.png'

mapboxgl.accessToken = 'pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA';

export default function App() {
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
  });
  return (
    <div className="parent">
      <div className="toolbar">
        <a href="https://dvrpc.org/">
          <img src={logo} className="logo" alt="Delaware Valley Regional Planning Commission white logo" />
        </a>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}