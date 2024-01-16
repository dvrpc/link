import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import mapboxgl from "mapbox-gl";
import { Stack, Box } from "@mantine/core";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

const SharedStudy = ({
  username: propUsername,
  schema: propSchema,
  studyId,
}) => {
  const { user } = useAuth0();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainer = useRef(null);
  const fetchStudy = async () => {
    try {
      const authUsername = user?.nickname || propUsername;
      let resolvedSchema = propSchema;
      const response = await fetch(
        `http://localhost:8000/get_user_studies/?username=${authUsername}&schema=${resolvedSchema}&study_name=${studyId}`,
      );
      if (!response.ok) throw new Error("Study not found");
      const data = await response.json();
      console.log(data.studies[0].shared);
      if (!data.studies[0].shared) throw new Error("Study not shared");
      setStudy(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-75.16, 40.05],
        zoom: 8.5,
      });
      map.on("load", () => {
        map.addSource("lts_tile", {
          type: "vector",
          url: "https://www.tiles.dvrpc.org/data/lts.json",
          minzoom: 8,
          promoteId: "id",
        });
        map.addSource("sw_tile", {
          type: "vector",
          url: "https://www.tiles.dvrpc.org/data/pedestrian-network.json",
          minzoom: 8,
        });
        console.log(propSchema);
        if (propSchema === "lts") {
          map.addLayer(
            {
              id: "lts",
              type: "line",
              source: "lts_tile",
              "source-layer": "existing_conditions_lts",
              paint: {
                "line-width": 1,
                "line-opacity": {
                  property: "lts_score",
                  stops: [
                    [1, 1],
                    [2, 1],
                    [3, 0.5],
                    [4, 0.5],
                  ],
                },
                "line-color": {
                  property: "lts_score",
                  stops: [
                    [1, "green"],
                    [2, "light green"],
                    [3, "yellow"],
                    [4, "red"],
                  ],
                },
              },
            },
            "road-label-simple",
          );
        } else if (propSchema === "sidewalk") {
          map.addLayer(
            {
              id: "sw",
              type: "line",
              source: "sw_tile",
              "source-layer": "ped_lines",
              paint: {
                "line-width": 1,
                "line-opacity": 1,
                "line-color": [
                  "match",
                  ["get", "feat_type"],
                  "UNMARKED",
                  "#FF0000",
                  "#00A36C",
                ],
              },
            },
            "road-label-simple",
          );
        }
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (studyId) {
      fetchStudy();
    }
  }, [studyId]);

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Stack style={{ height: "100vh", bg: "rgb(47, 79, 79)" }}>
      <Box bg="rgb(47, 79, 79)">
        {study && (
          <div>
            <h2>Study Name: {study.studies[0].seg_name}</h2>
            <p>
              <strong>Username:</strong> {study.studies[0].username}
            </p>
            <p>
              <strong>Has Isochrone:</strong>{" "}
              {study.studies[0].has_isochrone ? "Yes" : "No"}
            </p>
            <p>
              <strong>Miles:</strong> {study.studies[0].miles}
            </p>
          </div>
        )}
      </Box>
      <Box
        ref={mapContainer}
        sx={{ flexGrow: 1 }}
        style={{ width: "100%", height: "100%" }}
      />
    </Stack>
  );
};

export default SharedStudy;
