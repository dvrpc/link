import React, { useState, useEffect, useMemo } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import makeAuthenticatedRequest from "../Authentication/Api";
import { useMantineReactTable, MantineReactTable } from "mantine-react-table";
import { useColumns } from "./columns";
import {
  IconDownload,
  IconEye,
  IconTrash,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import {
  downloadGeojson,
  handleDelete,
  handleShareSwitch,
  handleRename,
} from "./ShelfApis";
import CsvButton from "../Csv/Csv";
import { StudyDetailView } from "./StudyDetailView";

const CONDENSED_COLUMN_KEYS = ["seg_name", "miles", "total_jobs", "total_pop"];

function StudyShelf({ connectionType, onStudyClick, opened, open, close }) {
  const [studiesData, setStudiesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [deleteParams, setDeleteParams] = useState({});
  const [renameParams, setRenameParams] = useState({});
  const [newName, setNewName] = useState("");
  const [selectedStudy, setSelectedStudy] = useState(null);
  const { user } = useAuth0();

  const handleSwitchChange = (rowIndex, rowData) => {
    setStudiesData((prevData) => {
      const newData = prevData.map((row, index) =>
        index === rowIndex ? { ...row, shared: !row.shared } : row,
      );
      handleShareSwitch(
        connectionType,
        user.nickname,
        rowData.seg_name,
        rowData.shared,
      );
      return newData;
    });
  };

  const allColumns = useColumns(handleSwitchChange, connectionType);

  const columns = useMemo(
    () =>
      CONDENSED_COLUMN_KEYS.map((key) =>
        allColumns.find((c) => c.accessorKey === key),
      ).filter(Boolean),
    [allColumns],
  );

  useEffect(() => {
    const refreshCards = async () => {
      try {
        const username = user?.nickname;
        let schema = connectionType === "bike" ? "lts" : "sidewalk";
        const response = await makeAuthenticatedRequest(
          `${process.env.REACT_APP_API_URL}/get_user_studies?username=${username}&schema=${schema}`,
          { method: "GET", headers: { "Content-Type": "application/json" } },
        );
        const data = await response.json();

        if (
          data.studies &&
          Array.isArray(data.studies) &&
          data.studies.length > 0
        ) {
          const processedData = data.studies.map((study) => ({
            ...study,
            bikeCrashesMessage: study.bike_ped_crashes.find(
              (crash) => typeof crash === "string" && crash.includes("414"),
            )
              ? "Segment too long for crash API"
              : `${study.bike_ped_crashes[0]?.["Total Bike Crashes"] ?? 0} `,
            pedCrashesMessage: study.bike_ped_crashes.find(
              (crash) => typeof crash === "string" && crash.includes("414"),
            )
              ? "Segment too long for crash API"
              : `${study.bike_ped_crashes[0]?.["Total Pedestrian Crashes"] ?? 0} `,
          }));
          setStudiesData(processedData);
        } else {
          console.error("No studies data found or invalid data structure.");
          setStudiesData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setStudiesData([]);
      }
    };

    if (!isModalOpen || !isRenameModalOpen) {
      refreshCards();
    }
  }, [user, connectionType, isModalOpen, isRenameModalOpen, onStudyClick]);

  const openRenameConfirmModal = (cxtype, seg, user) => {
    setIsRenameModalOpen(true);
    setRenameParams({ cxtype, seg, user });
  };

  const handleRenameClick = async () => {
    try {
      await handleRename(
        renameParams.cxtype,
        renameParams.seg,
        renameParams.user,
        newName,
      );
      setIsRenameModalOpen(false);
      setNewName("");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const openDeleteConfirmModal = (seg, user, cxtype) => {
    setIsModalOpen(true);
    setDeleteParams({ seg, user, cxtype });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(false);
    handleDelete(deleteParams.seg, deleteParams.user, deleteParams.cxtype);
  };

  const preprocessData = (data) => {
    return data
      .map((item) => ({
        ...item,
        circuit:
          item.circuit
            .map((c) => `${c.circuit}: ${c.miles.toFixed(2)} miles`)
            .join(", ") || "N/A",
        essential_services:
          item.essential_services
            .map((s) => `${s.category} (${s.count})`)
            .join(", ") || "No Services",
        rail_stations:
          item.rail_stations.map((s) => `${s.type}  (${s.count})`).join(", ") ||
          "No Stations",
      }))
      .sort((a, b) => a.archived - b.archived);
  };

  const processedData = useMemo(
    () => preprocessData(studiesData),
    [studiesData],
  );

  const table = useMantineReactTable({
    columns,
    data: processedData,

    enableRowActions: true,
    positionActionsColumn: "last",

    enableStickyHeader: true,
    enableFullScreenToggle: false,
    enableColumnActions: false,

    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Actions",
        size: 60,
        minSize: 60,
        maxSize: 60,
        grow: false,
      },
    },
    mantineTableContainerProps: {
      sx: {
        maxHeight: "300px",
        overflowX: "hidden",
      },
    },
    mantineTableProps: {
      sx: {
        tableLayout: "fixed",
      },
    },
    mantineTableHeadCellProps: {
      sx: {
        "& .mantine-TableHeadCell-Content-Wrapper": {
          whiteSpace: "wrap",
        },

        height: "auto",
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: "flex-end",
      },
    },

    defaultColumn: {
      minSize: 20,
      maxSize: 9999,
      size: 50,
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedStudy(row.original);
        onStudyClick(row.original.seg_name);
      },
      sx: {
        cursor: "pointer",
      },
    }),
    renderRowActionMenuItems: ({ row }) => (
      <>
        {row.original.archived && (
          <Menu.Item onClick={() => {}} color="green" icon={<IconPencil />}>
            Re-Run Study on new LTS Network
          </Menu.Item>
        )}
        <Menu.Item
          onClick={() =>
            openRenameConfirmModal(
              connectionType,
              row.original.seg_name,
              row.original.username,
            )
          }
          icon={<IconPencil />}
        >
          Rename Study
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            setSelectedStudy(row.original);
            onStudyClick(row.original.seg_name);
          }}
          icon={<IconEye />}
        >
          View Study
        </Menu.Item>

        <Menu.Item
          onClick={() =>
            downloadGeojson(
              row.original.seg_name,
              row.original.username,
              connectionType,
            )
          }
          icon={<IconDownload />}
        >
          Download GeoJSON of Study
        </Menu.Item>

        <Menu.Item
          onClick={() =>
            openDeleteConfirmModal(
              row.original.seg_name,
              row.original.username,
              connectionType,
            )
          }
          color="red"
          icon={<IconTrash />}
        >
          Delete Study
        </Menu.Item>
      </>
    ),
  });

  return (
    <>
      <div
        style={{
          width: opened ? "50%" : "0px",
          minWidth: opened ? "320px" : "0px",
          flexShrink: 0,
          height: "100%",
          overflow: "hidden",
          transition: "width 200ms ease, min-width 200ms ease",
          borderRight: opened
            ? "1px solid var(--mantine-color-gray-3, #dee2e6)"
            : "none",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "8px 12px",
            boxSizing: "border-box",
            overflowY: "auto",
            minWidth: "300px",
          }}
        >
          <Group position="right" mb="xs">
            <Tooltip label="Close">
              <ActionIcon onClick={close} aria-label="Close studies panel">
                <IconX size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>

          {selectedStudy ? (
            <StudyDetailView
              study={selectedStudy}
              onBack={() => setSelectedStudy(null)}
            />
          ) : (
            <>
              <MantineReactTable table={table} onRowCl />
              <CsvButton schema={connectionType} username={user.nickname} />
            </>
          )}
        </div>
      </div>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirming Deletion"
      >
        <Text>Are you sure you want to delete this study?</Text>
        <Group position="right" mt="md">
          <Button onClick={handleDeleteClick} color="red">
            Yes, Delete
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>
      <Modal
        opened={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title="Rename Study?"
      >
        <Text>What do you want to rename the study to?</Text>
        <Group position="right" mt="md">
          <TextInput
            placeholder="New Study Name"
            value={newName}
            onChange={(event) => setNewName(event.currentTarget.value)}
          />
          <Button onClick={handleRenameClick}>Rename</Button>
          <Button onClick={() => setIsRenameModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>
    </>
  );
}

export default StudyShelf;
