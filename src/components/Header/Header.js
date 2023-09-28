import { Header, Flex, Container } from "@mantine/core";
import React, { useState } from "react";
import Logo from "../Logo/Logo";
import StudyShelf from "../StudyShelf/StudyShelf";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import Logout from "../Authentication/Logout";
import Greeting from "./Greeting";

export function HeaderSimple({ connectionType, setConnectionType }) {
  return (
    <Container fluid h={80} bg="rgb(47, 79, 79)">
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
          <StudyShelf
            connectionType={connectionType}
            setConnectionType={setConnectionType}
          />
          <ConnectionToggle
            connectionType={connectionType}
            setConnectionType={setConnectionType}
          />
          <Flex
            style={{ marginLeft: "auto" }}
            align="center"
            direction="row"
            pl="20px"
            gap="md"
          >
            <Greeting />
            <Logout />
          </Flex>
        </Flex>
      </Header>
    </Container>
  );
}
