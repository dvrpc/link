import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxMap from "../Map/MapboxMap";
import { HeaderSimple } from "../Header/Header";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function MainComponent() {
  const [draw, setDraw] = useState(null);
  const [connectionType, setConnectionType] = useState("bike");

  return (
    <div className="parent">
      <HeaderSimple
        connectionType={connectionType}
        setConnectionType={setConnectionType}
      />
      <AnalyzeButton draw={draw} connectionType={connectionType} />
      <MapboxMap setDraw={setDraw} connectionType={connectionType} />
    </div>
  );
}
