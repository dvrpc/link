import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

function StudyCard({ data }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FKvA02evfKvA%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=d9b4fc51d6bed5c0c86ee636e0b06f6fe4c67d746f8ca970ad1c3cafc073b240&ipo=images"
          height={160}
          alt="NERV"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{data.seg_name}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Project info
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Edit Project
      </Button>
    </Card>
  );
}

export default StudyCard;
