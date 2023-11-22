import React, { useEffect } from "react";
import { useMap } from "./MapContext";

const AddSegment = ({ userSegmentData, connectionType, draw }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !draw || !userSegmentData) return;

    draw.deleteAll();

    // Add the user segment data to the draw instance
    userSegmentData.features.forEach((feature) => {
      draw.add(feature);
    });

    return () => {
      // When the component unmounts, remove the drawn features and the event listener
      if (map) {
        userSegmentData.features.forEach((feature) => {
          draw.delete(feature.id);
        });
      }
    };
  }, [map, draw, userSegmentData]);

  return null;
};

export default AddSegment;
