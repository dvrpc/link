import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxMap from "../Map/MapboxMap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { themeConfig } from "./mantineTheme";
import { HeaderSimple } from "../Header/Header";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function App() {
  const [draw, setDraw] = useState(null);
  const [connectionType, setConnectionType] = useState("bike");

  return (
    <MantineProvider theme={themeConfig}>
      <div className="parent">
        <HeaderSimple
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
        <MapboxMap setDraw={setDraw} connectionType={connectionType} />
        <AnalyzeButton draw={draw} />
      </div>
    </MantineProvider>
  );
}
