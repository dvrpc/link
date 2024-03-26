import React, { useState, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import drawInstance from "../Map/MapboxDrawConfig";
import makeAuthenticatedRequest from "../Authentication/Api";

function AnalyzeButton({ connectionType, onAnalyze, disabled }) {
  const [project, setProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth0();
  const [opened, { open, close }] = useDisclosure(false);
  const [errorModalOpened, setErrorModalOpened] = useState(false);



  const handleAnalyzeClick = () => {
    if (drawInstance) {
      const allFeatures = drawInstance.getAll();
      const automaticProjectName = checkAndSetProjectName(allFeatures.features);

      if (automaticProjectName) {
        setProject(automaticProjectName);
        setIsLoading(true);
        sendDataToServer(allFeatures);
      } else {
        open();
      }
    }
  };


  const checkAndSetProjectName = (features) => {
    for (const feature of features) {
      if (feature.properties && feature.properties.name) {
        return feature.properties.name;
      }
    }
    return null;
  };

  const handleChooseDifferentName = () => {
    setErrorModalOpened(false);
    open();
  };

  const handleOverwrite = async () => {
    if (drawInstance) {
      const allFeatures = drawInstance.getAll();
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
      const response = await makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL}/analyze${queryString}`,
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
      let errorMessage;
      if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Network error occured";
      }

      if (errorMessage.includes("Project name already used")) {
        setError("Project name already used.");
        setErrorModalOpened(true);
      } else {
        setError(errorMessage);
        setErrorModalOpened(true);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const applyProjectName = async () => {
    if (drawInstance) {
      const allFeatures = drawInstance.getAll();
      console.log(allFeatures)

      let automaticProjectName = checkAndSetProjectName(allFeatures.features);
      if (automaticProjectName) {
        setProject(automaticProjectName);
        console.log("Project name in geojson:", automaticProjectName);
      } else {

        allFeatures.features.forEach((feature, index) => {
          feature.properties.name =
            index === 0 ? project : `${project}${index + 1}`;
        });
      }

      setIsLoading(true);
      const bodyData = {
        connection_type: connectionType,
        geo_json: allFeatures,
        username: user.nickname,
      };

      try {
        const response = await makeAuthenticatedRequest(
          `${process.env.REACT_APP_API_URL}/analyze`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          },
        );

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
        let errorMessage = "Network error occurred";
        if (typeof error.message === "string") {
          try {
            const errorObj = JSON.parse(error.message);
            if (errorObj.detail) {
              errorMessage = errorObj.detail;
            }
          } catch (e) {
            errorMessage = error.message;
          }
        }
        setError(errorMessage);
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
      <Modal opened={errorModalOpened} onClose={function() { setErrorModalOpened(false); }} title="Error">
        <Text>{error}</Text>
        {error === "Project name already used." && (
          <>
            <Button onClick={handleChooseDifferentName}>Choose Different Name</Button>
            <Button loading={isLoading} color="red" onClick={handleOverwrite}>Overwrite</Button>
          </>
        )}
      </Modal>


      {/* Study Name Modal */}
      <Modal opened={opened} onClose={close} title={isLoading ? "Processing..." : "Name your study"}>
        {!isLoading && (
          <>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Enter study name"
            />
            <Button loading={isLoading} onClick={applyProjectName}>
              Submit
            </Button>
          </>
        )}
        {isLoading && <Text>Processing segments...</Text>}
      </Modal>


      {/* Analyze Button */}
      <Button
        style={{
          position: "absolute",
          top: "90px",
          left: "10px",
          zIndex: 10,
        }}
        onClick={handleAnalyzeClick}
        disabled={disabled}
      >
        Analyze
      </Button>
    </>
  );
}

export default AnalyzeButton;
