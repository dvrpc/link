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
const DETAIL_FIELDS = [
  { label: "Segment Name", key: "seg_name" },
  { label: "Username", key: "username" },
  { label: "Miles", key: "miles" },
  { label: "Total Population", key: "total_pop" },
  { label: "Total Jobs", key: "total_jobs" },
  { label: "Shared", key: "shared", format: (v) => (v ? "Yes" : "No") },
  {
    label: "Island > 300 Miles",
    key: "has_isochrone",
    format: (v) => (v ? "Yes" : "No"),
  },
  { label: "Circuit", key: "circuit" },
  { label: "Essential Services", key: "essential_services" },
  { label: "Rail Stations", key: "rail_stations" },
  { label: "Disabled Individuals", key: "disabled" },
  { label: "Ethnic Minorities", key: "ethnic_minority" },
  { label: "Female", key: "female" },
  { label: "Foreign Born", key: "foreign_born" },
  { label: "Limited English Proficiency (LEP)", key: "lep" },
  { label: "Low Income", key: "low_income" },
  { label: "Older Adults", key: "older_adult" },
  { label: "Racial Minorities", key: "racial_minority" },
  { label: "Youth", key: "youth" },
  { label: "Bike Crashes", key: "bikeCrashesMessage" },
  { label: "Pedestrian Crashes", key: "pedCrashesMessage" },
];

export function StudyDetailView({ study, onBack }) {
  const theme = useMantineTheme();
  return (
    <div>
      <Group position="apart" mb="sm">
        <Button
          variant="subtle"
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
              To analyze this corridor using the current network, first make
              sure the geography of this archived study is on the map. Then,
              select <strong>Analyze</strong> at the top left of the map, and
              save it with a new study name.
            </Text>
          </div>
        </Paper>
      )}
      <SimpleGrid cols={2} spacing="sm">
        {DETAIL_FIELDS.map(({ label, key, format }) => (
          <DetailField
            key={key}
            label={label}
            value={format ? format(study[key]) : study[key]}
          />
        ))}
      </SimpleGrid>
      {/* <div style={{ padding: "0 4px" }}>
        {DETAIL_FIELDS.map(({ label, key, format }) => {
          const raw = study[key];
          const value = format ? format(raw) : (raw ?? "N/A");
          return (
            <Text size="sm" key={key} mb={4}>
              <strong>{label}:</strong> {value}
            </Text>
          );
        })}
      </div> */}
    </div>
  );
}
