import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Affix, Text, Modal, Drawer, Button, Group, Menu } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import makeAuthenticatedRequest from "../Authentication/Api";
import { useMantineReactTable, MantineReactTable } from 'mantine-react-table';
import { useColumns } from './columns';
import { IconDownload, IconEye, IconTrash } from '@tabler/icons-react';
import { downloadGeojson, handleDelete, } from './ShelfApis'
import CsvButton from "../Csv/Csv";

function StudyShelf({ connectionType, onStudyClick }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [studiesData, setStudiesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteParams, setDeleteParams] = useState({});
  const { user } = useAuth0();
  const columns = useColumns();

  useEffect(() => {
    console.log("Final data being rendered:", studiesData);
  }, [studiesData]);


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

    if (!isModalOpen) {
      refreshCards();
    }

  }, [user, connectionType, isModalOpen]);

  const openDeleteConfirmModal = (seg, user, cxtype) => {
    setIsModalOpen(true);
    setDeleteParams({ seg, user, cxtype });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(false);
    handleDelete(deleteParams.seg, deleteParams.user, deleteParams.cxtype)
  };

  const table = useMantineReactTable({
    columns,
    data: studiesData,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item onClick={() => onStudyClick(row.original.seg_name)} icon={<IconEye />}>View Study</Menu.Item>
        <Menu.Item onClick={() => downloadGeojson(row.original.seg_name, row.original.username, connectionType)} icon={<IconDownload />}>Download GeoJSON of Study</Menu.Item>
        <Menu.Item onClick={() => openDeleteConfirmModal(row.original.seg_name, row.original.username, connectionType)} color='red' icon={<IconTrash />}>Delete Study</Menu.Item>
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
        closeOnEscape={true}
        style={{ padding: 0 }}
      >
        <MantineReactTable table={table} />
        <CsvButton schema={connectionType} username={user.nickname} />
      </Drawer>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Deletion"
      >
        <Text>Are you sure you want to delete this study?</Text>
        <Group position="right" mt="md">
          <Button onClick={() => handleDeleteClick(deleteParams.seg, deleteParams.user, deleteParams.cxtype)} color="red">
            Yes, Delete
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </Group>
      </Modal>
      <Group position="center">
        <Button onClick={open}>My Studies</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
