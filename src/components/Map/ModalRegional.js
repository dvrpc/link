import React, { useEffect } from "react";
import { Button, Modal, List } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


function ModalRegional() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, [open]);

  return (
    <>
      <Modal size="xl" opened={opened} onClose={close} title="LINK Regional Connectivity Analysis">
        To create a regional connectivity analysis with LINK, DVRPC ran the tool on all LTS 3 and 4 roads in the region.
        The results are available in this webmap, and can be filtered by county or by attribute reported in LINK.

        To run this analysis, DVRPC segmented LTS 3 and 4 roads into smaller pieces by dissolving on the following fields:
        <List>
          <List.Item>Number of lanes</List.Item>
          <List.Item>Speed</List.Item>
          <List.Item>Typeno</List.Item>
          <List.Item>LTS score</List.Item>
          <List.Item>Bike facilities</List.Item>
          <List.Item>County name</List.Item>
        </List>


      </Modal>

      <Button onClick={open}>Explainer</Button>
    </>
  );
}

export default ModalRegional;
