import React, { useEffect, useContext } from "react";
import { useMap, MapContext } from "./MapContext";
import drawInstance from "./MapboxDrawConfig";

const AddSegment = ({ userSegmentData, isCleared }) => {
  const map = useMap();
  const { updateDrawingState } = useContext(MapContext);
  useEffect(() => {
    if (!map || !drawInstance || !userSegmentData || isCleared) return;
    console.log("Adding user segment data:", userSegmentData);
    drawInstance.deleteAll();
    userSegmentData.features.forEach((feature) => {
      drawInstance.add(feature);
    });
    updateDrawingState();
  }, [map, drawInstance, userSegmentData, isCleared]);

  return null;
};

export default AddSegment;
