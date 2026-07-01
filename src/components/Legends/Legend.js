import React from "react";
import {
  Tooltip,
  Paper,
  Stack,
  Text,
  Box,
  useMantineTheme,
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

  const LegendRow = ({ label, color, height = 4 }) => (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        columnGap: 12,
      }}
    >
      <Text size="xs" c={text} ta="right">
        {label}
      </Text>
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          style={{
            width: "100%",
            maxWidth: 90,
            height,
            borderRadius: 999,
            background: color,
          }}
        />
      </Box>
    </Box>
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
        <Stack style={{ gap: "4px" }}>
          <Text size="md" fw={600}>
            Level of Traffic Stress (LTS)
          </Text>
          {connectionType === "bike" ? (
            <>
              <LegendRow label="LTS 1" color="#4b7f00" />
              <LegendRow label="LTS 2" color="#2ea043" />
              <LegendRow label="LTS 3" color="#ffd43b" />
              <LegendRow label="LTS 4" color="#8E5FB0" />
            </>
          ) : (
            <>
              <LegendRow label="Sidewalks" color="#00A36C" />
              <LegendRow label="Unmarked Crosswalks" color="#FF0000" />
            </>
          )}
          <LegendRow label="Your Study" color="#0ea5e9" />
          <LegendRow label="Low-Stress Area" color="#12b886" height={16} />
        </Stack>
      </Paper>
    </Tooltip>
  );
}

export default Legend;
