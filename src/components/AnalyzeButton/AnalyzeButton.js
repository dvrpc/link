import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function AnalyzeButton({ draw }) {
  const [project, setProject] = React.useState("");

  const analyzeData = (allFeatures) => {
    console.log(allFeatures);
  };

  const applyProjectName = () => {
    if (draw) {
      const allFeatures = draw.getAll();
      allFeatures.features.forEach((feature, index) => {
        feature.properties.name = `${project}${index + 1}`;
      });
      analyzeData(allFeatures);
    }
    close();
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Name Segments">
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Enter project name"
        />
        <Button onClick={applyProjectName}>Submit</Button>
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
