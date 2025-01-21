import React from "react";
import LoginButton from "./Login";
import Explainer from "../Explainer/Explainer";
import {
  Anchor,
  Container,
  Flex,
  Box,
  Center,
  Text,
  Space,
} from "@mantine/core";
import logo from "../../assets/1727_Link_logo_transparent.png";
import logofull from "../../assets/logofull.png";
export default function LoginPage() {
  return (
    <>
      <Center
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        bg="rgb(47, 79, 79)"
      >
        <img style={{ width: "200px", height: "auto" }} src={logofull} />
        <img style={{ width: "350px", height: "auto" }} src={logo} />
        <Text size="lg">
          Link is a tool that helps you understand the potential impact of
          building bicycle or pedestrian facilities.
        </Text>
        <Container>
          <Text size="sm" style={{ textAlign: "center" }}>
            This web page is a public resource of general information. The
            Delaware Valley Regional Planning Commission (DVRPC) makes no
            warranty, representation, or guarantee as to the content, sequence,
            accuracy, timeliness, or completeness of any of the spatial data or
            database information provided herein. DVRPC and partner state,
            local, and other agencies shall assume no liability for errors,
            omissions, or inaccuracies in the information provided regardless of
            how caused; or any decision made or action taken or not taken by any
            person relying on any information or data furnished within.
          </Text>
        </Container>
        <Text size="lg">
          Login below, or start by reading our getting started guide.
        </Text>
        <Space h="md" />
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <LoginButton />
          <Explainer />
        </Flex>
        <Anchor
          href="https://www.dvrpc.org/policies/"
          target="_blank"
          underline="hover"
        >
          Policies
        </Anchor>
        <Anchor
          href="https://www.dvrpc.org/products/24156?key=2uMKwNhTN1k4h7gPhw9RyJcani7dWpdu"
          target="_blank"
          underline="hover"
        >
          Abstract
        </Anchor>
      </Center>
    </>
  );
}
