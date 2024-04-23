import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import makeAuthenticatedRequest from "../Authentication/Api";
import { useMantineReactTable, MantineReactTable } from 'mantine-react-table';
import { useColumns } from './columns';

function StudyShelf({ connectionType, onStudyClick }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [studiesData, setStudiesData] = useState([]);  // State to store fetched data
  const { user } = useAuth0();
  const columns = useColumns();

  useEffect(() => {
    console.log("Final data being rendered:", studiesData);
  }, [studiesData]);  // This useEffect will run whenever studiesData changes


  useEffect(() => {
    async function refreshCards() {
      try {
        const username = user?.nickname; // Ensure user is defined
        let schema = connectionType === "bike" ? "lts" : "sidewalk";
        const response = await makeAuthenticatedRequest(
          `${process.env.REACT_APP_API_URL}/get_user_studies?username=${username}&schema=${schema}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data

        if (data.studies && Array.isArray(data.studies) && data.studies.length > 0) {
          setStudiesData(data.studies); // Directly set fetched data without sorting
        } else {
          console.error("No studies data found or invalid data structure.");
          setStudiesData([]); // Handle no data case
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setStudiesData([]); // Handle error by setting an empty array
      }
    };

    refreshCards();
  }, [user, connectionType]); // Dependencies are user and connectionType only

  const table = useMantineReactTable({
    columns,
    data: studiesData, // Use state directly here as it's already stable
  });

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "slide-up" }}
        title="My Studies"
        padding="20px 10px 60px 10px"
        position="bottom"
      >
        <MantineReactTable table={table} />
      </Drawer>
      <Group position="center">
        <Button onClick={open}>My Studies</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
