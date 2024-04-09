import React from "react";
import LoginButton from "./Login";
import Explainer from "../Explainer/Explainer"
import { Flex, Center, Text, Space } from "@mantine/core";
import Logo from "../Logo/Logo"

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
        <Logo />
        <Space h="md" />
        <Space h="md" />
        <Text size="xl">Welcome to DVRPC LINK!</Text>
        <Text>
          Link is a tool that helps you understand the potential impact of
          building bicycle or pedestrian facilities.

        </Text>
        <Text>
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
      </Center>
    </>
  );
}


