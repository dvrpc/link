import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";

function StudyShelf() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Projects">
        <AnalyzeButton />
      </Drawer>

      <Group position="center">
        <Button onClick={open}>Projects</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
