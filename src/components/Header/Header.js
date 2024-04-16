import { Button, Switch, Header, Flex, Container } from "@mantine/core";
import React from "react";
import Logo from "../Logo/Logo";
import StudyShelf from "../StudyShelf/StudyShelf";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logout from "../Authentication/Logout";
import Greeting from "./Greeting";
import Explainer from "../Explainer/Explainer";

export function HeaderSimple({
  connectionType,
  setConnectionType,
  onStudyClick,
  resetDrawingState,
  onToggleTheme,
  isLoading,
  setIsLoading,
}) {
  return (
    <Container fluid h={90} bg="rgb(47, 79, 79)">
      <Header height={90}>
        <Flex
          bg="rgb(47, 79, 79)"
          mih={90}
          gap="md"
          justify="left"
          align="center"
          direction="row"
          wrap="wrap"
          pl="20px"
        >
          <Logo logoWidth="150px" />
          <StudyShelf
            connectionType={connectionType}
            setConnectionType={setConnectionType}
            onStudyClick={onStudyClick}
          />
          <Explainer />
          <ThemeToggle onToggleTheme={onToggleTheme} isLoading={isLoading} setIsLoading={setIsLoading} />
          <ConnectionToggle
            connectionType={connectionType}
            setConnectionType={setConnectionType}
            resetDrawingState={resetDrawingState}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
