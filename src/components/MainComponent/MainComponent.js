import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxMap from "../Map/MapboxMap";
import { HeaderSimple } from "../Header/Header";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";
import ClearButton from "../ClearButton/ClearButton";
import AddLayer from "../Map/UserLayers";
import AddSegment from "../Map/UserSegments";
import { MapContext } from "../Map/MapContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getGeometries, getSegments } from "../Map/GetGeoms";
import drawInstance from "../Map/MapboxDrawConfig";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

export default function MainComponent() {
  const [draw, setDraw] = useState(null); // I can't control this one as much, this is from mapbox
  const [connectionType, setConnectionType] = useState("bike");
  const [map, setMap] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [userSegmentData, setUserSegmentData] = useState(null);
  const { user } = useAuth0();
  const [hasDrawings, setHasDrawings] = useState(false); // indicates presence of drawings on map

  useEffect(() => {
    setGeojsonData(null);
    setUserSegmentData(null);
  }, [connectionType]);

  useEffect(() => {
    console.log("draw state updated", draw);
  }, [draw]);

  const handleStudyClick = (study) => {
    getGeometries(setGeojsonData, connectionType, study, user.nickname);
    getSegments(setUserSegmentData, connectionType, study, user.nickname);
  };

  const updateDrawingState = () => {
    if (drawInstance) {
      console.log("draw");
      const drawings = drawInstance.getAll();
      setHasDrawings(drawings.features.length > 0);
    } else {
      console.log("no draw");
    }
  };

  return (
    <MapContext.Provider value={{ map, draw, updateDrawingState }}>
      <div className="parent">
        <HeaderSimple
          connectionType={connectionType}
          setConnectionType={setConnectionType}
          onStudyClick={handleStudyClick}
        />
        <AnalyzeButton
          disabled={!hasDrawings}
          connectionType={connectionType}
          onAnalyze={handleStudyClick}
        />
        <ClearButton draw={draw} disabled={!hasDrawings} />
        <MapboxMap
          setHasDrawings={setHasDrawings}
          setDraw={setDraw}
          setMap={setMap}
          connectionType={connectionType}
        />
        {geojsonData && (
          <AddLayer geojsonData={geojsonData} connectionType={connectionType} />
        )}{" "}
        {userSegmentData && (
          <AddSegment
            userSegmentData={userSegmentData}
            connectionType={connectionType}
          />
        )}{" "}
      </div>
    </MapContext.Provider>
  );
}
