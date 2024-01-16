import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import mapboxgl from "mapbox-gl";
import { Stack, Box, Table } from "@mantine/core";
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
      <Box
        ref={mapContainer}
        sx={{ flexGrow: 2 }}
        style={{ width: "100%", height: "60%" }}
      />
      <Box
        sx={{ flexGrow: 1 }}
        style={{
          background: "rgb(47, 79, 79)",
          width: "100%",
          padding: "10px",
        }}
      >
        {study && (
          <div
            style={{
              background: "rgb(47, 79, 79)",
              overflowY: "auto",
              maxHeight: "400px",
            }}
          >
            <h2>Study Name: {study.studies[0].seg_name}</h2>
            <Table>
              <tbody>
                {/* Basic and Demographic Information */}
                <tr>
                  <td>
                    <strong>Username:</strong>
                  </td>
                  <td>{study.studies[0].username}</td>
                  <td>
                    <strong>Has Isochrone:</strong>
                  </td>
                  <td>{study.studies[0].has_isochrone ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Miles:</strong>
                  </td>
                  <td>{study.studies[0].miles}</td>
                  <td>
                    <strong>Total Population:</strong>
                  </td>
                  <td>{study.studies[0].total_pop}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Disabled Population:</strong>
                  </td>
                  <td>{study.studies[0].disabled}</td>
                  <td>
                    <strong>Ethnic Minority:</strong>
                  </td>
                  <td>{study.studies[0].ethnic_minority}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Female:</strong>
                  </td>
                  <td>{study.studies[0].female}</td>
                  <td>
                    <strong>Foreign Born:</strong>
                  </td>
                  <td>{study.studies[0].foreign_born}</td>
                </tr>
                <tr>
                  <td>
                    <strong>LEP:</strong>
                  </td>
                  <td>{study.studies[0].lep}</td>
                  <td>
                    <strong>Low Income:</strong>
                  </td>
                  <td>{study.studies[0].low_income}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Older Adult:</strong>
                  </td>
                  <td>{study.studies[0].older_adult}</td>
                  <td>
                    <strong>Racial Minority:</strong>
                  </td>
                  <td>{study.studies[0].racial_minority}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Youth:</strong>
                  </td>
                  <td>{study.studies[0].youth}</td>
                  <td>
                    <strong>Total Jobs:</strong>
                  </td>
                  <td>{study.studies[0].total_jobs}</td>
                </tr>

                {/* Crashes Information */}
                {study.studies[0].bike_ped_crashes.map((crash, index) => (
                  <tr key={`crash-${index}`}>
                    <td>
                      <strong>Bike/Pedestrian Crash {index + 1}:</strong>
                    </td>
                    <td colSpan={3}>
                      Bike: {crash["Total Bike Crashes"]}, Pedestrian:{" "}
                      {crash["Total Pedestrian Crashes"]}
                    </td>
                  </tr>
                ))}

                {/* Essential Services */}
                {study.studies[0].essential_services.map((service, index) => (
                  <tr key={`service-${index}`}>
                    <td>
                      <strong>Essential Service {index + 1}:</strong>
                    </td>
                    <td colSpan={3}>
                      {service.type}: {service.count}
                    </td>
                  </tr>
                ))}

                {/* Rail Stations */}
                {study.studies[0].rail_stations.map((station, index) => (
                  <tr key={`station-${index}`}>
                    <td>
                      <strong>Rail Station {index + 1}:</strong>
                    </td>
                    <td colSpan={3}>
                      {station.type}: {station.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Box>
    </Stack>
  );
};

export default SharedStudy;
