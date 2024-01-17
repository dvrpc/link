import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import StudyCard from "./StudyCard";
import CsvButton from "../Csv/Csv";
import { useAuth0 } from "@auth0/auth0-react";

function StudyShelf({ connectionType, onStudyClick }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [cards, setCards] = useState([]);
  const { user } = useAuth0();

  const refreshCards = async () => {
    try {
      const username = user.nickname;
      let schema;
      if (connectionType === "bike") {
        schema = "lts";
      } else if (connectionType === "pedestrian") {
        schema = "sidewalk";
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get_user_studies?username=${username}&schema=${schema}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      console.log(data);

      if (
        data.studies &&
        data.studies.length > 0 &&
        typeof data.studies[0] === "object"
      ) {
        if (data.studies[0].hasOwnProperty("seg_name")) {
          const sortedStudies = data.studies.sort((a, b) =>
            a.seg_name.localeCompare(b.seg_name),
          );
          setCards(sortedStudies);
        } else {
          console.error("Error: studies do not have a seg_name property.");
        }
      } else {
        setCards(["No studies have been created yet!"]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    open();
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        transitionProps={{
          transition: "slide-right",
        }}
        title="My Studies"
      >
        {cards.length > 0 &&
          cards[0] !== "No studies have been created yet!" && (
            <CsvButton schema={connectionType} username={user.nickname} />
          )}
        {cards.length === 0 ||
        cards[0] === "No studies have been created yet!" ? (
          <div>
            No studies have been created yet! Draw one or upload a GeoJSON using
            the tools on the right side of the map.
          </div>
        ) : (
          cards.map((card, index) => (
            <StudyCard
              key={index}
              data={card}
              username={user.nickname}
              connection={connectionType}
              onRenameSuccess={refreshCards}
              closeFunction={close}
              onStudyClick={onStudyClick}
              refreshCards={refreshCards}
            />
          ))
        )}
      </Drawer>
      <Group position="center">
        <Button onClick={refreshCards}>My Studies</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
