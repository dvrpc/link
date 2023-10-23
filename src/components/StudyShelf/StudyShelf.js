import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import StudyCard from "./StudyCard";
import { useAuth0 } from "@auth0/auth0-react";

function StudyShelf({ connectionType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [cards, setCards] = useState([]);
  const { user } = useAuth0();

  const refreshCards = async () => {
    try {
      const username = user.nickname;
      if (connectionType === "bike") {
        var schema = "lts";
      } else if (connectionType === "pedestrian") {
        var schema = "sidewalk";
      }

      const response = await fetch(
        `http://localhost:8000/get_user_studies?username=${username}&schema=${schema}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data["studies"][0] === "No studies have been created yet!") {
        setCards(["No studies have been created yet!"]);
      } else {
        setCards(data.studies.reverse());
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
        {cards[0] === "No studies have been created yet!" ? (
          <div>
            No studies have been created yet! Draw one or upload a GeoJSON using
            the tools on the right side of the map.{" "}
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
