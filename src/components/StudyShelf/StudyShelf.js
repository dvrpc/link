import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import makeAuthenticatedRequest from "../Authentication/Api";
import { useMantineReactTable, MantineReactTable } from 'mantine-react-table';
import { useColumns } from './columns';

function StudyShelf({ connectionType, onStudyClick }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [studiesData, setStudiesData] = useState([]);
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
        console.log("Fetched data:", data);

        if (data.studies && Array.isArray(data.studies) && data.studies.length > 0) {
          const flattenedStudies = data.studies.map(study => ({
            ...study,
            totalBikeCrashes: study.bike_ped_crashes[0] ? study.bike_ped_crashes[0]['Total Bike Crashes'] : 'N/A',
            totalPedestrianCrashes: study.bike_ped_crashes[0] ? study.bike_ped_crashes[0]['Total Pedestrian Crashes'] : 'N/A',
            essentialServicesSummary: study.essential_services.map(es => `${es.count} x ${es.type}`).join(', ')
          }));

          setStudiesData(flattenedStudies);
        } else {
          console.error("No studies data found or invalid data structure.");
          setStudiesData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setStudiesData([]);
      }
    };

    refreshCards();
  }, [user, connectionType, opened]);

  const table = useMantineReactTable({
    columns,
    data: studiesData,
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
