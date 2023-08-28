import React, { useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxMap from "../Map/MapboxMap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { themeConfig } from "./mantineTheme";
import { HeaderSimple } from "../Header/Header";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function App() {
  const [connectionType, setConnectionType] = useState("bike");

  return (
    <MantineProvider theme={themeConfig}>
      <div className="parent">
        <HeaderSimple
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
        <MapboxMap connectionType={connectionType} />
      </div>
    </MantineProvider>
  );
}
