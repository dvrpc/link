import React from "react";
import { Center, Text } from "@mantine/core";

export default function Admin() {
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
        <Text>You are an admin.</Text>
      </div>
    </Center>
  );
}
