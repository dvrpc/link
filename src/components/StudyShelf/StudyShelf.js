import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import StudyCard from "./StudyCard";
import { useAuth0 } from "@auth0/auth0-react";

function StudyShelf({ connectionType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [cards, setCards] = useState([]);
  const { user } = useAuth0();

  const cardCounter = async () => {
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

      setCards(data.studies);
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
        title="Projects"
      >
        {cards.map((card, index) => (
          <StudyCard key={index} data={card} />
        ))}
      </Drawer>
      <Group position="center">
        <Button onClick={cardCounter}>Projects</Button>
      </Group>
    </>
  );
}

export default StudyShelf;
