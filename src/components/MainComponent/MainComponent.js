import React, { useState, useEffect } from "react";
import { LoadingOverlay, Switch, Tooltip, Button, Stack } from "@mantine/core";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxMap from "../Map/MapboxMap";
import { HeaderSimple } from "../Header/Header";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";
import ClearButton from "../ClearButton/ClearButton";
import StudyShelf from "../StudyShelf/StudyShelf";
import AddLayer from "../Map/UserLayers";
import AddSegment from "../Map/UserSegments";
import Legend from "../Legends/Legend";
import { MapContext } from "../Map/MapContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getGeometries, getSegments } from "../Map/GetGeoms";
import drawInstance from "../Map/MapboxDrawConfig";
import { useDisclosure } from "@mantine/hooks";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Keep this in sync with the height prop on HeaderSimple's Header/Container.
const HEADER_HEIGHT = 80;

export default function MainComponent({ onToggleTheme, themeType }) {
  const [isLoading, setIsLoading] = useState(false);
  const darkMapStyle = "mapbox://styles/mapbox/dark-v11";
  const lightMapStyle = "mapbox://styles/mapbox/light-v11";

  const [connectionType, setConnectionType] = useState("bike");
  const [map, setMap] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [userSegmentData, setUserSegmentData] = useState(null);
  const { user } = useAuth0();
  const [hasDrawings, setHasDrawings] = useState(false); // indicates presence of drawings on map
  const [isCleared, setIsCleared] = useState(false);
  const [shelfOpened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (map) {
      const newStyle = themeType === "dark" ? darkMapStyle : lightMapStyle;
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
      <LoadingOverlay
        visible={isLoading}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
        overlayBlur={2}
        loaderProps={{ size: "xl", color: "rgb(44, 76, 76)", variant: "bars" }}
      />
      <div className="parent">
        <HeaderSimple
          connectionType={connectionType}
          setConnectionType={setConnectionType}
          resetDrawingState={resetDrawingState}
          onToggleTheme={onToggleTheme}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <Legend connectionType={connectionType} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflow: "hidden",
          }}
        >
          <StudyShelf
            connectionType={connectionType}
            setConnectionType={setConnectionType}
            onStudyClick={handleStudyClick}
            opened={shelfOpened}
            open={open}
            close={close}
          />

          <div
            style={{
              position: "relative",
              flex: 1,
              minWidth: 0,
              height: "100%",
            }}
          >
            <Stack
              spacing="xs"
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 10,
              }}
            >
              {!shelfOpened && (
                <Tooltip label="Open my studies">
                  <Button variant="filled" color="blue" onClick={open}>
                    My Studies
                  </Button>
                </Tooltip>
              )}
              <AnalyzeButton
                disabled={!hasDrawings}
                connectionType={connectionType}
                onAnalyze={handleStudyClick}
              />
              <ClearButton
                disabled={!hasDrawings}
                resetDrawingState={resetDrawingState}
              />
            </Stack>

            <MapboxMap
              setHasDrawings={setHasDrawings}
              setMap={setMap}
              connectionType={connectionType}
              themeType={themeType}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
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
