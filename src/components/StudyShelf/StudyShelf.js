import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";

function StudyShelf() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        transitionProps={{
          transition: "slide-right",
        }}
        title="Projects"
      ></Drawer>

      <Group position="center">
        <Button onClick={open}>Projects</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
