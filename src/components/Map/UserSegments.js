import React, { useEffect } from "react";
import { useMap } from "./MapContext";

const AddSegment = ({ userSegmentData, connectionType, draw }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !draw || !userSegmentData) return;

    // Add the user segment data to the draw instance
    userSegmentData.features.forEach((feature) => {
      draw.add(feature);
    });

    // Set up a listener for when the drawing is updated
    const updateDrawnFeatures = (e) => {
      // Handle the updated drawing here
      // e.features will contain the updated features
    };

    map.on("draw.update", updateDrawnFeatures);

    return () => {
      // When the component unmounts, remove the drawn features and the event listener
      if (map) {
        userSegmentData.features.forEach((feature) => {
          draw.delete(feature.id);
        });
        map.off("draw.update", updateDrawnFeatures);
      }
    };
  }, [map, draw, userSegmentData]);

  return null;
};

export default AddSegment;
