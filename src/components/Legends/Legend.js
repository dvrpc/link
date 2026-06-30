import React from "react";
import {
  Tooltip,
  Paper,
  Stack,
  Group,
  Text,
  Box,
  useMantineTheme,
  useComputedColorScheme,
} from "@mantine/core";

function Legend({ connectionType }) {
  const theme = useMantineTheme();
  const colorScheme = theme.colorScheme;
  const bg = colorScheme === "dark" ? theme.colors.dark[6] : theme.white;

  const border =
    colorScheme === "dark"
      ? `1px solid ${theme.colors.dark[4]}`
      : `1px solid ${theme.colors.gray[3]}`;

  const text = colorScheme === "dark" ? theme.white : theme.colors.dark[8];

  const label =
    connectionType === "bike"
      ? "LTS represents Level of Traffic Stress for cyclists, with a '1' being the least stressful and a '4' being the most stressful. Your study and the low-stress area are highlighted when viewing a study."
      : "Sidewalks are shown in green and unmarked crosswalks are shown in red. Draw a study to see the low-stress area it would connect.";

  if (connectionType !== "bike") {
    // keep your sidewalk legend here if desired
  }

  const LegendRow = ({ label, color }) => (
    <Group justify="space-between" gap="sm" wrap="nowrap">
      <Text size="sm" c={text}>
        {label}
      </Text>

      <Box
        style={{
          width: 90,
          height: 4,
          borderRadius: 999,
          background: color,
        }}
      />
    </Group>
  );

  return (
    <Tooltip multiline w={240} label={label}>
      <Paper
        shadow="md"
        radius="md"
        p="md"
        style={{
          position: "fixed",
          bottom: 30,
          right: 10,
          zIndex: 100,
          width: 250,
          background: bg,
          border,
        }}
      >
        <Stack style={{ gap: "6px" }}>
          <Text fw={600}>Level of Traffic Stress (LTS)</Text>

          <LegendRow label="LTS 1" color="#4b7f00" />
          <LegendRow label="LTS 2" color="#2ea043" />
          <LegendRow label="LTS 3" color="#ffd43b" />
          <LegendRow label="LTS 4" color="#8E5FB0" />
          <LegendRow label="Your Study" color="#0ea5e9" />

          <Group justify="space-between" wrap="nowrap">
            <Text size="sm" c={text}>
              Low-Stress Area
            </Text>

            <Box
              style={{
                width: 90,
                height: 18,
                borderRadius: 999,
                background: "#12b886",
              }}
            />
          </Group>
        </Stack>
      </Paper>
    </Tooltip>
  );
}

export default Legend;
