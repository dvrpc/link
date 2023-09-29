import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

function AnalyzeButton({ draw, connectionType }) {
  const [project, setProject] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth0();

  const sendDataToServer = async (geoJsonData) => {
    setIsLoading(true);
    const bodyData = {
      connection_type: connectionType,
      geo_json: geoJsonData,
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

      console.log(geoJsonData);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Server response:", data);
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setIsLoading(false);
  };

  const applyProjectName = async () => {
    if (draw) {
      const allFeatures = draw.getAll();
      allFeatures.features.forEach((feature, index) => {
        feature.properties.name = `${project}${index + 1}`;
      });
      await sendDataToServer(allFeatures);
    }
    close();
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
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
