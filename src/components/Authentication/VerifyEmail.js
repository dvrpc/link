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
        <Text size="xl">Welcome to DVRPC Connect.</Text>
        <Text>
          You must verify your email before proceeding. Please check click the
          link in your email, and then come back.
        </Text>
        <LoginButton />
      </div>
    </Center>
  );
}
