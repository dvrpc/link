import { Header, Flex } from "@mantine/core";
import React, { useState } from "react";
import Logo from "../Logo/Logo";
import StudyShelf from "../StudyShelf/StudyShelf";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import DrawProject from "../DrawProject/DrawProject";

export function HeaderSimple({ connectionType, setConnectionType }) {
  return (
    <Header height={80}>
      <Flex
        bg="rgb(47, 79, 79)"
        mih={80}
        gap="md"
        justify="left"
        align="center"
        direction="row"
        wrap="wrap"
        pl="20px"
      >
        <Logo />
        <StudyShelf />
        <ConnectionToggle
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
        <DrawProject />
      </Flex>
    </Header>
  );
}
