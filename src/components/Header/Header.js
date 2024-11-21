import { Tooltip, Header, Flex, Container, Button } from "@mantine/core";
import React from "react";
import Logo from "../Logo/Logo";
import StudyShelf from "../StudyShelf/StudyShelf";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logout from "../Authentication/Logout";
import Greeting from "./Greeting";
import Explainer from "../Explainer/Explainer";
import Video from "../Video/Video"
import Draft from "../Logo/Draft"

function Regional({ connectionType }) {
  if (connectionType == 'bike') {
    return <Tooltip multiline label="View the regional analysis, which was performed on all LTS 3 and 4 segments in the DVRPC Region.">
      <Button component="a"
        href="regional-connectivity-analysis">Regional Analysis </Button>
    </Tooltip>

  }
  return;
}

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
    <Container fluid h={80} bg="rgb(47, 79, 79)">
      <Header height={80}>
        <Flex
          bg="rgb(47, 79, 79)"
          mih={85}
          gap="md"
          justify="left"
          align="center"
          direction="row"
          wrap="wrap"
          pl="20px"
        >
          <Draft logoWidth="110px" />
          <Logo logoWidth="150px" />
          <StudyShelf
            connectionType={connectionType}
            setConnectionType={setConnectionType}
            onStudyClick={onStudyClick}
          />
          <Explainer />
          <Video></Video>
          <Regional connectionType={connectionType} />
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
