import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Group } from "@mantine/core";
import StudyCard from "./StudyCard";

function StudyShelf() {
  const [opened, { open, close }] = useDisclosure(false);
  const [cards, setCards] = useState([]);

  const cardCounter = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_user_studies");
      const data = await response.json();
      setCards(["Dummy1", "Dummy2", "Dummy3"]);
      // setCards(data);
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
