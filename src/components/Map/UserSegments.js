import React, { useEffect } from "react";
import { useMap } from "./MapContext";

const AddSegment = ({ userSegmentData, draw, updateDrawingState }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !draw || !userSegmentData) return;
    draw.deleteAll();
    userSegmentData.features.forEach((feature) => {
      draw.add(feature);
    });
    updateDrawingState();
  }, [map, draw, userSegmentData]);

  return null;
};

export default AddSegment;
