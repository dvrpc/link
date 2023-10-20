import React, { useState } from "react";
import { Card, Image, Text, Button, Group, TextInput } from "@mantine/core";

function StudyCard({ data, username, connection, onRenameSuccess }) {
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
          src="https://images.unsplash.com/photo-1511281480949-345f5eb08353?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1974"
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
          <Text fw={500}>Study: {data.seg_name}</Text>
        )}
      </Group>

      <Text size="sm" c="dimmed">
        Philadelphia island?{" "}
        <Text span c="teal">
          {data.has_isochrone.toString()}{" "}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Miles of low-stress islands:
        <Text span c="teal">
          {data.miles}{" "}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Total population:
        <Text span c="teal">
          {data.total_pop}{" "}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Hispanic/Latino population:
        <Text span c="teal">
          {data.hisp_lat}{" "}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Nearby circuit trails:
        <Text span c="teal">
          {JSON.stringify(data.circuit)}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Jobs:
        <Text span c="teal">
          {JSON.stringify(data.jobs)}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Bike crashes on segment:
        <Text span c="teal">
          {JSON.stringify(data.bike_crashes)}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Ped crashes on segment:
        <Text span c="teal">
          {JSON.stringify(data.ped_crashes)}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Essential services:
        <Text span c="teal">
          {JSON.stringify(data.essential_services)}
        </Text>
      </Text>
      <Text size="sm" c="dimmed">
        Rail Stations:
        <Text span c="teal">
          {JSON.stringify(data.rail_stations)}
        </Text>
      </Text>
    </Card>
  );
}

export default StudyCard;
