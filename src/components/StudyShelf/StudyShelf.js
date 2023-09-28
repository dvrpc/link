import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import StudyCard from "./StudyCard";

function StudyShelf() {
  const [opened, { open, close }] = useDisclosure(false);
  const [cards, setCards] = useState([]);

  const cardCounter = async () => {
    try {
      const username = "mmorley";
      const schema = "lts"; // or "sidewalk" depending on your needs

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
