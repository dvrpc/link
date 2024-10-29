import React, { useState, useEffect, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Tooltip, TextInput, Text, Modal, Drawer, Button, Group, Menu } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import makeAuthenticatedRequest from "../Authentication/Api";
import { useMantineReactTable, MantineReactTable } from 'mantine-react-table';
import { useColumns } from './columns';
import { IconDownload, IconEye, IconTrash, IconPencil } from '@tabler/icons-react';
import { downloadGeojson, handleDelete, handleShareSwitch, handleRename } from './ShelfApis';
import CsvButton from "../Csv/Csv";

function StudyShelf({ connectionType, onStudyClick }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [studiesData, setStudiesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [deleteParams, setDeleteParams] = useState({});
  const [renameParams, setRenameParams] = useState({});
  const [newName, setNewName] = useState('');
  const { user } = useAuth0();

  const handleSwitchChange = (rowIndex, rowData) => {
    setStudiesData((prevData) => {
      const newData = prevData.map((row, index) =>
        index === rowIndex ? { ...row, shared: !row.shared } : row
      );
      console.log(connectionType)
      handleShareSwitch(
        connectionType,
        user.nickname,
        rowData.seg_name,
        rowData.shared
      );
      return newData;
    });
  };
  const columns = useColumns(handleSwitchChange, connectionType);

  useEffect(() => {
    const refreshCards = async () => {
      try {
        const username = user?.nickname;
        let schema = connectionType === "bike" ? "lts" : "sidewalk";
        const response = await makeAuthenticatedRequest(
          `${process.env.REACT_APP_API_URL}/get_user_studies?username=${username}&schema=${schema}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const data = await response.json();

        if (data.studies && Array.isArray(data.studies) && data.studies.length > 0) {
          const processedData = data.studies.map(study => ({
            ...study,
            bikeCrashesMessage: study.bike_ped_crashes.find(crash => typeof crash === 'string' && crash.includes('414'))
              ? 'Segment too long for crash API'
              : `${study.bike_ped_crashes[0]?.['Total Bike Crashes'] ?? 0} `,
            pedCrashesMessage: study.bike_ped_crashes.find(crash => typeof crash === 'string' && crash.includes('414'))
              ? 'Segment too long for crash API'
              : `${study.bike_ped_crashes[0]?.['Total Pedestrian Crashes'] ?? 0} `,
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
      await handleRename(renameParams.cxtype, renameParams.seg, renameParams.user, newName);
      setIsRenameModalOpen(false);
      setNewName('');
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
    return data.map(item => ({
      ...item,
      circuit: item.circuit.map(c => `${c.circuit}: ${c.miles.toFixed(2)} miles`).join(', ') || 'N/A',
      essential_services: item.essential_services.map(s => `${s.count} x ${s.type}`).join(', ') || 'No Services',
      rail_stations: item.rail_stations.map(s => `${s.count} x ${s.type}`).join(', ') || 'No Stations'
    }));
  };

  const processedData = useMemo(() => preprocessData(studiesData), [studiesData]);

  const table = useMantineReactTable({
    columns,
    data: processedData,
    enableRowActions: true,
    enableStickyHeader: true,
    enableFullScreenToggle: false,
    mantineTableContainerProps: { sx: { maxHeight: '300px' } },
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item onClick={() => openRenameConfirmModal(connectionType, row.original.seg_name, row.original.username)} icon={<IconPencil />}>Rename Study</Menu.Item>
        <Menu.Item onClick={() => onStudyClick(row.original.seg_name)} icon={<IconEye />}>View Study</Menu.Item>
        <Menu.Item onClick={() => downloadGeojson(row.original.seg_name, row.original.username, connectionType)} icon={<IconDownload />}>Download GeoJSON of Study</Menu.Item>
        <Menu.Item onClick={() => openDeleteConfirmModal(row.original.seg_name, row.original.username, connectionType)} color="red" icon={<IconTrash />}>Delete Study</Menu.Item>
      </>
    ),
  });

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "slide-up" }}
        position="bottom"
        overlayOpacity={0}
        overlayColor="transparent"
        withOverlay={false}
        padding="xs"
        closeOnEscape
        style={{ padding: 0 }}
      >
        <MantineReactTable table={table} />
        <CsvButton schema={connectionType} username={user.nickname} />
      </Drawer>
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
          <Button onClick={handleRenameClick}>
            Rename
          </Button>
          <Button onClick={() => setIsRenameModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>
      <Group position="center">
        <Tooltip label="View studies that you've created here">
          <Button onClick={open}>My Studies</Button>
        </Tooltip>
      </Group>
    </>
  );
}

export default StudyShelf;
