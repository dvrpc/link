import React, { useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxMap from "../Map/MapboxMap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";
import ClearButton from "../ClearButton/ClearButton";
import Toolbar from "../Toolbar/Toolbar";
import { MantineProvider } from "@mantine/core";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function App() {
  const [connectionType, setConnectionType] = useState("bike");

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="parent">
        <Toolbar />
        <div id="box">
          Segment IDs (click features!)
          <div id="segids"></div>
          <ClearButton />
          <ConnectionToggle
            connectionType={connectionType}
            setConnectionType={setConnectionType}
          />
          <AnalyzeButton />
        </div>
        <MapboxMap connectionType={connectionType} />
      </div>
    </MantineProvider>
  );
}
