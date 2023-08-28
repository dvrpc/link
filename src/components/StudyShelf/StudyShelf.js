import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import AnalyzeButton from "../AnalyzeButton/AnalyzeButton";

function StudyShelf() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Studies">
        <AnalyzeButton />
      </Drawer>

      <Group position="center">
        <Button onClick={open}>Open Drawer</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
