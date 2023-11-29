import React, { useEffect, useContext } from "react";
import { useMap, MapContext } from "./MapContext";

const AddSegment = ({ userSegmentData }) => {
  const map = useMap();
  const { draw, updateDrawingState } = useContext(MapContext);

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
