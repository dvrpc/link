import React, { useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxMap from "../Map/MapboxMap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import StudyShelf from "../StudyShelf/StudyShelf";
import { MantineProvider } from "@mantine/core";
import { themeConfig } from "./mantineTheme";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function App() {
  const [connectionType, setConnectionType] = useState("bike");

  return (
    <MantineProvider theme={themeConfig}>
      <div className="parent">
        <Toolbar
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
        <div id="box">
          Segment IDs (click features!)
          <div id="segids"></div>
        </div>
        <MapboxMap connectionType={connectionType} />
      </div>
    </MantineProvider>
  );
}
