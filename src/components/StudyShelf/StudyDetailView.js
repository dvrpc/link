import {
  Tooltip,
  TextInput,
  Text,
  Modal,
  Button,
  Group,
  Paper,
  SimpleGrid,
  useMantineTheme,
  Container,
  Flex,
} from "@mantine/core";
import {
  IconDownload,
  IconEye,
  IconTrash,
  IconPencil,
  IconX,
  IconArrowLeft,
  IconAlertTriangle,
} from "@tabler/icons-react";

function DetailField({ label, value }) {
  return (
    <Group
      position="apart"
      spacing="xs"
      noWrap
      py={4}
      sx={(theme) => ({
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Text size="sm" fw={600} c="dimmed">
        {label}
      </Text>

      <Text size="sm" ta="right">
        {value ?? "N/A"}
      </Text>
    </Group>
  );
}

const DETAIL_FIELD_GROUPS = [
  {
    title: "Study Info",
    fields: [
      { label: "Segment Name", key: "seg_name" },
      { label: "Username", key: "username" },
      { label: "Circuit", key: "circuit" },
      { label: "Shared", key: "shared", format: (v) => (v ? "Yes" : "No") },
    ],
  },
  {
    title: "Corridor Metrics",
    fields: [
      { label: "Miles", key: "miles" },
      { label: "Total Population", key: "total_pop" },
      { label: "Total Jobs", key: "total_jobs" },
      {
        label: "Island > 300 Miles",
        key: "has_isochrone",
        format: (v) => (v ? "Yes" : "No"),
      },
      { label: "Essential Services", key: "essential_services" },
      { label: "Rail Stations", key: "rail_stations" },
    ],
  },
  {
    title: "Title VI Indicators",
    fields: [
      { label: "Disabled Individuals", key: "disabled" },
      { label: "Ethnic Minorities", key: "ethnic_minority" },
      { label: "Female", key: "female" },
      { label: "Foreign Born", key: "foreign_born" },
      { label: "Limited English Proficiency (LEP)", key: "lep" },
      { label: "Low Income", key: "low_income" },
      { label: "Older Adults", key: "older_adult" },
      { label: "Racial Minorities", key: "racial_minority" },
      { label: "Youth", key: "youth" },
    ],
  },
  {
    title: "Safety",
    fields: [
      { label: "Bike Crashes", key: "bikeCrashesMessage" },
      { label: "Pedestrian Crashes", key: "pedCrashesMessage" },
    ],
  },
];

export function StudyDetailView({ study, onBack }) {
  const theme = useMantineTheme();
  return (
    <div>
      <Group position="apart" mb="sm">
        <Button
          variant="subtle"
          color="gray"
          leftIcon={<IconArrowLeft size={16} />}
          onClick={onBack}
        >
          Back to studies
        </Button>
      </Group>
      {study.archived && (
        <Paper
          p="md"
          mb="lg"
          radius="md"
          withBorder
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.orange[8]
                : theme.colors.orange[0],
          }}
        >
          <Flex gap="xs" mb="xs">
            <IconAlertTriangle
              size={22}
              color={
                theme.colorScheme === "dark" ? "white" : theme.colors.orange[6]
              }
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <Text
              fw={700}
              c={
                theme.colorScheme === "dark" ? "white" : theme.colors.orange[8]
              }
              mb={2}
            >
              Archived Study
            </Text>
          </Flex>
          <div>
            <Text
              size="sm"
              c={theme.colorScheme === "dark" ? "white" : theme.black}
            >
              This study was generated using the{" "}
              <strong>previous LTS network</strong>, so its results may differ
              from the current analysis.
            </Text>

            <Text
              size="sm"
              mt={6}
              c={theme.colorScheme === "dark" ? "white" : theme.black}
            >
              1. Ensure the correct study segments are already shown on the map
              (don't click Clear)
              <br />
              2. Select <strong>Analyze</strong> (top left)
              <br />
              3. Save the results under a new study name
            </Text>
          </div>
        </Paper>
      )}

      {DETAIL_FIELD_GROUPS.map(({ title, fields }) => (
        <div key={title} style={{ marginBottom: 20 }}>
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            mb={6}
            sx={{ letterSpacing: 0.5 }}
          >
            {title}
          </Text>
          <SimpleGrid cols={2} spacing="sm">
            {fields.map(({ label, key, format }) => (
              <DetailField
                key={key}
                label={label}
                value={format ? format(study[key]) : study[key]}
              />
            ))}
          </SimpleGrid>
        </div>
      ))}
    </div>
  );
}
