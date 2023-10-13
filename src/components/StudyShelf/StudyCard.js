import React, { useState } from "react";
import { Card, Image, Text, Button, Group, TextInput } from "@mantine/core";

function StudyCard({ data, username, connection, onRenameSuccess }) {
  console.log(data.has_isochrone);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.seg_name);

  const handleRename = async () => {
    setIsEditing(false);
    try {
      if (connection === "bike") {
        var schema = "lts";
      } else if (connection === "pedestrian") {
        var schema = "sidewalk";
      }

      const response = await fetch(
        `http://localhost:8000/rename?username=${username}&schema=${schema}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldName: data.seg_name,
            newName: name,
          }),
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Server response:", data);
        if (typeof onRenameSuccess === "function") {
          onRenameSuccess();
        }
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FKvA02evfKvA%2Fmaxresdefault.jpg&f=1&nofb=1"
          height={160}
          alt="NERV"
        />
      </Card.Section>

      <Group justify="space-between" mb="md" style={{ alignItems: "flex-end" }}>
        <Button
          variant="light"
          size="xs"
          color="blue"
          justify="right"
          mt="md"
          radius="md"
          onClick={isEditing ? handleRename : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Rename"}
        </Button>
        {isEditing ? (
          <TextInput
            placeholder="New name"
            value={name}
            size="xs"
            onChange={(event) => setName(event.currentTarget.value)}
          />
        ) : (
          <Text fw={500}>{data.seg_name}</Text>
        )}
      </Group>

      <Text size="sm" c="dimmed">
        Philadelphia island? {data.has_isochrone.toString()}
        {"\n"}
        Miles of low-stress islands: {data.has_isochrone.toString()}
        {"\n"}
        Total population: {data.has_isochrone.toString()}
        {"\n"}
        Hispanic/Latino: {data.has_isochrone.toString()}
        {"\n"}
        Jobs: {data.has_isochrone.toString()}
        {"\n"}
        Bike crashes along segment: {data.has_isochrone.toString()}
        {"\n"}
        Ped crashes along segment: {data.has_isochrone.toString()}
        {"\n"}
        Essential services: {data.has_isochrone.toString()}
        {"\n"}
        Rail stations: {data.has_isochrone.toString()}
        {"\n"}
      </Text>
    </Card>
  );
}

export default StudyCard;
