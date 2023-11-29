import React, { useState, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { MapContext } from "../Map/MapContext";

function AnalyzeButton({ connectionType, onAnalyze, disabled }) {
  const [project, setProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth0();
  const [opened, { open, close }] = useDisclosure(false);
  const [errorModalOpened, setErrorModalOpened] = useState(false);
  const { draw } = useContext(MapContext);

  const handleChooseDifferentName = () => {
    setErrorModalOpened(false);
    open();
  };

  const handleOverwrite = async () => {
    if (draw) {
      const allFeatures = draw.getAll();
      const featuresWithNames = allFeatures.features.map((feature, index) => {
        const properties = feature.properties || {};
        properties.name =
          properties.name || (index === 0 ? project : `${project}${index + 1}`);
        return { ...feature, properties };
      });
      setErrorModalOpened(false);

      try {
        await sendDataToServer(
          { ...allFeatures, features: featuresWithNames },
          true,
        );
        onAnalyze(project);
      } catch (error) {
        console.error("Failed to overwrite data:", error);
      }
    }
  };

  const sendDataToServer = async (geoJsonData, overwrite = false) => {
    setIsLoading(true);
    const bodyData = {
      connection_type: connectionType,
      geo_json: geoJsonData,
      username: user.nickname,
    };

    const queryString = overwrite ? "?overwrite=true" : "";

    try {
      const response = await fetch(
        `http://localhost:8000/analyze${queryString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An error occurred");
      }

      const data = await response.json();
      console.log("Server response:", data);
      setProject("");
      close();
    } catch (error) {
      setError(error.message || "Network error occurred");
      setErrorModalOpened(true);
    } finally {
      setIsLoading(false);
    }
  };

  const applyProjectName = async () => {
    if (draw) {
      const allFeatures = draw.getAll();
      allFeatures.features.forEach((feature, index) => {
        feature.properties.name =
          index === 0 ? project : `${project}${index + 1}`;
      });

      setIsLoading(true);
      const bodyData = {
        connection_type: connectionType,
        geo_json: allFeatures,
        username: user.nickname,
      };

      try {
        const response = await fetch("http://localhost:8000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        const responseData = await response.json();

        if (!response.ok) {
          if (responseData.detail === "Project name already used.") {
            setError(responseData.detail);
            setErrorModalOpened(true);
          } else {
            throw new Error(
              responseData.detail ||
                "An error occurred while applying the project name.",
            );
          }
        } else {
          onAnalyze(project);
        }
      } catch (error) {
        setError(error.message || "Network error occurred");
        setErrorModalOpened(true);
      } finally {
        setIsLoading(false);
        close();
      }
    }
  };

  return (
    <>
      {/* Error Modal */}
      <Modal
        opened={errorModalOpened}
        onClose={() => setErrorModalOpened(false)}
        title="Error"
      >
        <Text>{error}</Text>
        <Button onClick={handleChooseDifferentName}>
          Choose Different Name
        </Button>
        <Button color="red" onClick={handleOverwrite}>
          Overwrite
        </Button>
      </Modal>
      {/* Project Name Modal */}
      <Modal opened={opened} onClose={close} title="Name your project">
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Enter project name"
        />
        <Button loading={isLoading} onClick={applyProjectName}>
          Submit
        </Button>
      </Modal>

      {/* Analyze Button */}
      <Button
        style={{
          position: "absolute",
          top: "90px",
          left: "10px",
          zIndex: 10,
        }}
        onClick={open}
        disabled={disabled}
      >
        Analyze
      </Button>
    </>
  );
}

export default AnalyzeButton;
