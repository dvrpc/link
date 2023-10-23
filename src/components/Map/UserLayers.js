import React, { useEffect, useState, useRef } from "react";

function UserLayers({ mapInstance, geojsonData }) {
  const [map, setMap] = useState(null);

  const add_user_layers = () => {
    mapInstance.addLayer(
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
  };
}
export default UserLayers;
