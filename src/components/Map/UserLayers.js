import React, { useEffect, useState, useRef } from "react";
import { useMap } from "./MapContext";

function UserLayers({ geojsonData }) {
  const map = useMap();

  const add_user_layers = () => {
    if (map) {
      map.addLayer(
        {
          id: "user_lines",
          type: "line",
          source: {
            type: "geojson",
            data: { geojsonData },
          },
          paint: {
            "line-width": 2,
            "line-opacity": 1,
            "line-color": "green",
          },
        },
        "road-label-simple",
      );

      return;
    }
  };
}
export default UserLayers;
