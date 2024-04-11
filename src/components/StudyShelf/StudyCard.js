import React, { useState } from "react";
import {
  Anchor,
  Card,
  Text,
  Button,
  Group,
  Stack,
  TextInput,
  Modal,
  Switch,
} from "@mantine/core";
import makeAuthenticatedRequest from "../Authentication/Api";

function StudyCard({
  data,
  username,
  connection,
  onRenameSuccess,
  onStudyClick,
  refreshCards,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.seg_name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShared, setIsShared] = useState(data.shared);

  const handleRename = async () => {
    setIsEditing(false);
    try {
      const schema = connection === "bike" ? "lts" : "sidewalk";
      const response = await makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL}/rename?username=${username}&schema=${schema}`,
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
        onRenameSuccess();
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    setIsModalOpen(false);
    try {
      const schema = connection === "bike" ? "lts" : "sidewalk";
      const response = await makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL}/delete?username=${username}&seg_name=${data.seg_name}&schema=${schema}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Server response:", data);
        refreshCards();
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleShareSwitch = async () => {
    try {
      const schema = connection === "bike" ? "lts" : "sidewalk";
      const newSharedState = !isShared;

      const response = await makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL}/share?username=${username}&seg_name=${data.seg_name}&schema=${schema}&shared=${newSharedState}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const updatedData = await response.json();
        console.log("Server response:", updatedData);
        setIsShared(newSharedState);
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const downloadGeojson = async (segName) => {
    const schema = connection === "bike" ? "lts" : "sidewalk";
    try {
      const response = await makeAuthenticatedRequest(
        `${process.env.REACT_APP_API_URL}/download_user_study_geoms?username=${username}&study=${segName}&schema=${schema}`,
        { method: "GET" },
      );

      if (response.ok) {
        const blob = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = `${segName}_${schema}_link_tool_geoms.zip`;

        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
          if (filenameMatch) filename = filenameMatch[1];
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to fetch the file:", response.statusText);
      }
    } catch (error) {
      console.error("There was an error downloading the file:", error);
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
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

      <Text size="sm" color="dimmed">
        Miles of low-stress islands:{" "}
        <Text component="span" color="teal">
          {data.miles}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        Total population:{" "}
        <Text component="span" color="teal">
          {data.total_pop}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Disabled population:{" "}
        <Text component="span" color="teal">
          {data.disabled}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Ethnic minorities:{" "}
        <Text component="span" color="teal">
          {data.ethnic_minority}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Female population:{" "}
        <Text component="span" color="teal">
          {data.female}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Foreign born population:{" "}
        <Text component="span" color="teal">
          {data.foreign_born}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Limited English population:{" "}
        <Text component="span" color="teal">
          {data.lep}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Low income population:{" "}
        <Text component="span" color="teal">
          {data.low_income}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Older adults:{" "}
        <Text component="span" color="teal">
          {data.older_adult}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Racial minorities:{" "}
        <Text component="span" color="teal">
          {data.racial_minority}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        - Youth:{" "}
        <Text component="span" color="teal">
          {data.youth}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        Jobs:{" "}
        <Text component="span" color="teal">
          {data.total_jobs}{" "}
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        Nearby circuit trails:{" "}
        <Text component="span" color="teal">
          <pre>
            {data.circuit.length === 0
              ? 'N/A' // Display "N/A" if the data array is empty
              : data.circuit.map(({ circuit, miles }) =>
                circuit ? `${circuit}: ${miles}` : 'N/A'
              ).join('\n')
            }
          </pre>
        </Text>

      </Text>
      <Text size="sm" color="dimmed">
        Bicyclist and Pedestrian crashes in study buffer:
        <Text component="span" color="teal">
          <pre>
            {(data.bike_ped_crashes.length === 0 || (data.bike_ped_crashes.length === 1 && data.bike_ped_crashes[0]['Total Bike Crashes'] === 0 && data.bike_ped_crashes[0]['Total Pedestrian Crashes'] === 0))
              ? 'N/A'
              : data.bike_ped_crashes.map(item =>
                `${item['Total Bike Crashes'] === 0 ? 'N/A' : `Total Bike Crashes: ${item['Total Bike Crashes']}`} \n${item['Total Pedestrian Crashes'] === 0 ? 'N/A' : `Total Pedestrian Crashes: ${item['Total Pedestrian Crashes']}`}`
              ).join('\n')
            }
          </pre>
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        Essential services:
        <Text component="span" color="teal">
          <pre>
            {data.essential_services.length === 0
              ? 'N/A'
              : data.essential_services.map(({ type, count }) =>
                type ? `${type}: ${count}` : 'N/A'
              ).join('\n')
            }
          </pre>
        </Text>

      </Text>
      <Text size="sm" color="dimmed">
        Rail Stations:{" "}
        <Text component="span" color="teal">
          <Text component="span" color="teal">
            <pre>
              {data.rail_stations.length === 0
                ? 'N/A'
                : data.rail_stations.map(({ type, count }) =>
                  type ? `${type}: ${count}` : 'N/A'
                ).join('\n')
              }
            </pre>
          </Text>
        </Text>
      </Text>
      <Text size="sm" color="dimmed">
        Greater than 300 miles of connected low-stress segments? {" "}
        <Text component="span" color="teal">
          {data.has_isochrone.toString()}{" "}
        </Text>
      </Text>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Deletion"
      >
        <Text>Are you sure you want to delete this study?</Text>
        <Group position="right" mt="md">
          <Button onClick={handleDelete} color="red">
            Yes, Delete
          </Button>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
        </Group>
      </Modal>

      <Stack position="right" mt="md">
        <Button onClick={openDeleteModal} color="red">
          Delete Study
        </Button>
        <Button onClick={() => downloadGeojson(data.seg_name)}>
          Download GeoJSON
        </Button>
        <Button onClick={() => onStudyClick(data.seg_name)}>View Study</Button>
        <Switch
          checked={isShared}
          onChange={handleShareSwitch}
          label={
            isShared ? (
              <Anchor href={`/webmaps/link/user/${data.username}/${connection === "bike" ? "lts" : "sidewalk"}/study/${data.seg_name}`} target="_blank" rel="noopener noreferrer" >
                Sharable Link
              </Anchor>
            ) : (
              'Make study public'
            )
          }
        />
      </Stack>
    </Card>
  );
}

export default StudyCard;
