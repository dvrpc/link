import React from "react";
import LoginButton from "./Login";
import Explainer from "../Explainer/Explainer"
import { Flex, Center, Text, Space } from "@mantine/core";
import logo from "../../assets/1727_Link_logo_co-branded-03.png"
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
        <img style={{ width: "350px", height: "auto" }} src={logo} />
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


