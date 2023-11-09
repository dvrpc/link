import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function Explainer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal size="70%" opened={opened} onClose={close} title="What is LTS?">
        What is Level of Traffic Stress (LTS)? This table summarizes LTS in
        terms of the cyclist type that would be comfortable on certain levels
        and the characteristics of those levels. Generally, as the colors
        indicate, the higher the LTS, the more dangerous or the greater the
        perceived danger, and the more confident the cyclist needs to feel on
        their bike to consider riding on that type of road. LTS is a road
        classification scheme based on the estimated comfort of bicyclists in
        the traffic stream. DVRPC's LTS assignment is based on the number of
        lanes, effective strong vehicle speed strong, and the presence and type
        of bicycle facility on the road segment. A few surveys have shown that
        the Interested but Concerned group is the largest, and therefore, a lot
        of bicycle infrastructure planning is done with them in mind.{" "}
      </Modal>
      <Button onClick={open}>What is LTS?</Button>
    </>
  );
}

export default Explainer;
