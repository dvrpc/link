import React, { useState, useEffect } from "react";
import { Center, Text, Table, Button } from "@mantine/core";

export default function Admin() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSchema, setCurrentSchema] = useState("lts");

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/get_user_studies/?schema=${currentSchema}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudies(data.studies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, [currentSchema]);

  const toggleSchema = () => {
    setCurrentSchema(currentSchema === "lts" ? "sidewalk" : "lts");
  };

  const renderTable = () => {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>username</th>
            <th>seg_name</th>
            <th>has_isochrone</th>
            <th>miles</th>
            <th>total_pop</th>
            <th>disabled</th>
            <th>ethnic_minority</th>
            <th>female</th>
            <th>foreign_born</th>
            <th>lep</th>
            <th>low_income</th>
            <th>older_adult</th>
            <th>racial_minority</th>
            <th>youth</th>
            <th>circuit</th>
            <th>total_jobs</th>
            <th>bike_ped_crashes</th>
            <th>essential_services</th>
            <th>rail_stations</th>
            <th>deleted</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((studies) => (
            <tr key={studies.seg_name}>
              <td>{studies.username}</td>
              <td>{studies.seg_name}</td>
              <td>{studies.has_isochrone ? "True" : "False"}</td>
              <td>{studies.miles}</td>
              <td>{studies.total_pop}</td>
              <td>{studies.disabled}</td>
              <td>{studies.ethnic_minority}</td>
              <td>{studies.female}</td>
              <td>{studies.foreign_born}</td>
              <td>{studies.lep}</td>
              <td>{studies.low_income}</td>
              <td>{studies.older_adult}</td>
              <td>{studies.racial_minority}</td>
              <td>{studies.youth}</td>
              <td>
                {Array.isArray(studies.circuit) && studies.circuit.length > 0
                  ? studies.circuit
                      .map(
                        (circuitItem) =>
                          `${circuitItem.circuit}: ${circuitItem.miles.toFixed(
                            2,
                          )} miles`,
                      )
                      .join(", ")
                  : "No Circuit Data"}
              </td>
              <td>{studies.total_jobs}</td>
              <td>
                {studies.bike_ped_crashes
                  .map(
                    (crash) =>
                      `Bike: ${crash["Total Bike Crashes"]}, Ped: ${crash["Total Pedestrian Crashes"]}`,
                  )
                  .join(", ")}
              </td>
              <td>
                {studies.essential_services
                  .map((service) => `${service.type}: ${service.count}`)
                  .join(", ")}
              </td>
              <td>{studies.rail_stations}</td>
              <td>{studies.deleted ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgb(47, 79, 79)",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1200px", margin: "20px" }}>
        <Text size="xl">Admin Portal</Text>
        <Button onClick={toggleSchema}>Current schema: {currentSchema}</Button>

        <div
          style={{ maxHeight: "80vh", overflowY: "auto", marginTop: "20px" }}
        >
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            renderTable()
          )}
        </div>
      </div>
    </Center>
  );
}
