import { Button, Header, Flex, Container } from "@mantine/core";
import React from "react";
import Logo from "../Logo/Logo";
import StudyShelf from "../StudyShelf/StudyShelf";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import Logout from "../Authentication/Logout";
import Greeting from "./Greeting";
import Explainer from "../Explainer/Explainer";

export function HeaderSimple({
  connectionType,
  setConnectionType,
  onStudyClick,
  resetDrawingState,
  onToggleTheme,
}) {
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
            onStudyClick={onStudyClick}
          />
          <ConnectionToggle
            connectionType={connectionType}
            setConnectionType={setConnectionType}
            resetDrawingState={resetDrawingState}
          />
          <Explainer />
          <Button onClick={onToggleTheme}>Toggle Theme</Button>
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
