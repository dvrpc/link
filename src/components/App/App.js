import React, { useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxMap from "../Map/MapboxMap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";
import Logo from "../Logo/Logo";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function App() {
  const [connectionType, setConnectionType] = useState("bike");

  return (
    <div className="parent">
      <div className="toolbar">
        <Logo />
      </div>
      <div id="box">
        Segment IDs (click features!)
        <div id="segids"></div>
        <button id="clear_button">Clear</button>
        <ConnectionToggle
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
        <AnalyzeButton />
      </div>
      <MapboxMap connectionType={connectionType} />
    </div>
  );
}
