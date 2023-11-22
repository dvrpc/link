import React, { useEffect } from "react";
import { useMap } from "./MapContext";

const AddSegment = ({ userSegmentData, draw }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !draw || !userSegmentData) return;

    userSegmentData.features.forEach((feature) => {
      draw.add(feature);
    });
  }, [map, draw, userSegmentData]);

  return null;
};

export default AddSegment;
