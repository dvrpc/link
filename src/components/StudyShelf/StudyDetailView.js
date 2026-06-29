import {
  Tooltip,
  TextInput,
  Text,
  Modal,
  Button,
  Group,
  Menu,
  ActionIcon,
} from "@mantine/core";
import {
  IconDownload,
  IconEye,
  IconTrash,
  IconPencil,
  IconX,
  IconArrowLeft,
} from "@tabler/icons-react";
function DetailField({ label, value, children }) {
  return (
    <div>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
      {children ?? <Text size="sm">{value ?? "N/A"}</Text>}
    </div>
  );
}

const DETAIL_FIELDS = [
  { label: "Username", key: "username" },
  { label: "Segment Name", key: "seg_name" },
  { label: "Miles", key: "miles" },
  { label: "Total Jobs", key: "total_jobs" },
  { label: "Shared", key: "shared", format: (v) => (v ? "Yes" : "No") },
  {
    label: "Island > 300 Miles",
    key: "has_isochrone",
    format: (v) => (v ? "Yes" : "No"),
  },
  { label: "Total Population", key: "total_pop" },
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
      <div style={{ padding: "0 4px" }}>
        {DETAIL_FIELDS.map(({ label, key, format }) => {
          const raw = study[key];
          const value = format ? format(raw) : (raw ?? "N/A");
          return (
            <Text size="sm" key={key} mb={4}>
              <strong>{label}:</strong> {value}
            </Text>
          );
        })}
      </div>
    </div>
  );
}
