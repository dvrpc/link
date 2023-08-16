import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import logo from '../../assets/dvrpc_white_logo.png'
import MapboxMap from '../Map/MapboxMap';
import ConnectionToggle from '../ConnectionToggle/ConnectionToggle'

mapboxgl.accessToken = 'pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA';

export default function App() {

  const [connectionType, setConnectionType] = useState('bike')

  return (
    <div className="parent">
      <div className="toolbar">
        <a href="https://dvrpc.org/">
          <img src={logo} className="logo" alt="Delaware Valley Regional Planning Commission white logo" />
        </a>
      </div>
      <div id="box">
        Segment IDs (click features!)
    <div id="segids"></div>
        <button id="clear_button">Clear</button>
        <ConnectionToggle connectionType={connectionType} setConnectionType={setConnectionType} />
      </div>
      <MapboxMap connectionType={connectionType} />
    </div>
  );
}