import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

function AnalyzeButton({ draw, connectionType, onAnalyze }) {
  const [project, setProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth0();
  const [opened, { open, close }] = useDisclosure(false);
  const [errorModalOpened, setErrorModalOpened] = useState(false);

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
      await sendDataToServer(
        { ...allFeatures, features: featuresWithNames },
        true,
      );
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
      console.log(geoJsonData);
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

      if (response.status === 200) {
        const data = await response.json();
        console.log("Server response:", data);
        setProject("");
        close();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "An error occurred");
        setErrorModalOpened(true);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred");
      setErrorModalOpened(true);
    }
    setIsLoading(false);
  };

  const applyProjectName = async () => {
    if (draw) {
      const allFeatures = draw.getAll();
      allFeatures.features.forEach((feature, index) => {
        feature.properties.name =
          index === 0 ? project : `${project}${index + 1}`;
      });
      await sendDataToServer(allFeatures);
      onAnalyze(project);
    }
    close();
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
      >
        Analyze
      </Button>
    </>
  );
}

export default AnalyzeButton;
