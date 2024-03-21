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

export default function MainComponent({ onToggleTheme, themeType }) {
  const darkMapStyle = 'mapbox://styles/mapbox/dark-v11';
  const lightMapStyle = 'mapbox://styles/mapbox/light-v11';


  const [connectionType, setConnectionType] = useState("bike");
  const [map, setMap] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [userSegmentData, setUserSegmentData] = useState(null);
  const { user } = useAuth0();
  const [hasDrawings, setHasDrawings] = useState(false); // indicates presence of drawings on map
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    if (map) {
      const newStyle = themeType === 'dark' ? darkMapStyle : lightMapStyle;
      map.setStyle(newStyle);
    }
  }, [themeType, map]);

  useEffect(() => {
    setGeojsonData(null);
    setUserSegmentData(null);
  }, [connectionType]);

  const resetDrawingState = () => {
    setHasDrawings(false);
    setIsCleared(true);
  };

  const handleStudyClick = async (study) => {
    setIsCleared(true);

    try {
      await getGeometries(setGeojsonData, connectionType, study, user.nickname);

      await getSegments(
        setUserSegmentData,
        connectionType,
        study,
        user.nickname,
      );
    } catch (error) {
      console.error("Error fetching study data:", error);
    }

    setIsCleared(false);
  };

  const updateDrawingState = () => {
    if (drawInstance) {
      console.log("draw");
      const drawings = drawInstance.getAll();
      console.log("updateDrawingState called, features:", drawings.features);
      setHasDrawings(drawings.features.length > 0);
    } else {
      console.log("no draw");
    }
  };

  return (
    <MapContext.Provider value={{ map, updateDrawingState }}>
      <div className="parent">
        <HeaderSimple
          connectionType={connectionType}
          setConnectionType={setConnectionType}
          onStudyClick={handleStudyClick}
          resetDrawingState={resetDrawingState}
          onToggleTheme={onToggleTheme}
        />
        <AnalyzeButton
          disabled={!hasDrawings}
          connectionType={connectionType}
          onAnalyze={handleStudyClick}
        />
        <ClearButton
          disabled={!hasDrawings}
          resetDrawingState={resetDrawingState}
        />
        <MapboxMap
          setHasDrawings={setHasDrawings}
          setMap={setMap}
          connectionType={connectionType}
          themeType={themeType}
        />
        {geojsonData && (
          <AddLayer geojsonData={geojsonData} connectionType={connectionType} />
        )}{" "}
        {userSegmentData && (
          <AddSegment
            userSegmentData={userSegmentData}
            connectionType={connectionType}
            isCleared={isCleared}
          />
        )}{" "}
      </div>
    </MapContext.Provider>
  );
}
