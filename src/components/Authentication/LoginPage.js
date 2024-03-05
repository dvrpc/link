import React from "react";
import LoginButton from "./Login";
import { Center, Text } from "@mantine/core";

export default function LoginPage() {
  return (
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
      <div>
        <Text size="xl">Welcome to DVRPC Link.</Text>
        <Text>
          Link is a tool that helps you understand the potential impact of
          building bicycle or pedestrian facilities.{" "}
        </Text>
        <LoginButton />
      </div>
    </Center>
  );
}
