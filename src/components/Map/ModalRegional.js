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
          <List.Item>Type</List.Item>
          <List.Item>LTS score</List.Item>
          <List.Item>Bike facilities</List.Item>
          <List.Item>County name</List.Item>
        </List>

        <div>

          <br></br>
          The results were added to this webmap. Symbology is created dynamically using quantile breaks, depending on the current County and attribute selected.
          Not all results from LINK can be considered attributes- for example, lists of adjacent rail stations are not used or totaled in this regional analysis. Also
          note that ONLY LTS 3 and 4 segments are shown here. <br></br>
          <br></br>
          Blue segments represent a lower number of people or jobs that the segment would connect, while pink or white represent greater numbers of people.

          <br></br>
          <br></br>
          In short, each attribute of a segment (e.g., total population) represents the total number of people or jobs along the segment, but also within the low-stress islands accessible from
          that segment.
        </div>

      </Modal>

      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: '#474ED7', to: '#EC458D', deg: 90 }}
      >LINKing the region</Button>
    </>
  );
}

export default ModalRegional;
