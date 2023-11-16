import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Image } from "@mantine/core";
import LtsTable from "../LtsTable/LtsTable"
import d1 from "../../assets/d1.png";
import d2 from "../../assets/d2.png";
import d3 from "../../assets/d3.png";
import d4 from "../../assets/d4.png";
import d5 from "../../assets/d5.png";
import d6 from "../../assets/d6.png";
import d7 from "../../assets/d7.png";
import d8 from "../../assets/d8.png";
import d9 from "../../assets/d9.png";
import d10 from "../../assets/d10.png";
import d11 from "../../assets/d11.png";

function Explainer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal size="70%" opened={opened} onClose={close}>
        <Text size="lg">What is Level of Traffic Stress (LTS?)</Text>
        <br />
        <Text size="md">
          This table summarizes LTS in terms of the cyclist type that would be
          comfortable on certain levels and the characteristics of those levels.
          Generally, as the colors indicate, the higher the LTS, the more
          dangerous or the greater the perceived danger, and the more confident
          the cyclist needs to feel on their bike to consider riding on that
          type of road. LTS is a road classification scheme based on the
          estimated comfort of bicyclists in the traffic stream. DVRPC's LTS
          assignment is based on the number of lanes, effective strong vehicle
          speed strong, and the presence and type of bicycle facility on the
          road segment. A few surveys have shown that the Interested but
          Concerned group is the largest, and therefore, a lot of bicycle
          infrastructure planning is done with them in mind. {""}
        </Text>
        <LtsTable />
        <br />
        <br />
        <Text size="lg">Here is an example of how the connect tool uses LTS.</Text>
        <Text size="md">
          The yellow, or relatively high-stress, segment (LTS 3) is an arterial
          road, with two lanes in each direction. The green, low-stress roads
          (LTS 1 or 2) are neighborhood streets, and are primarily residential.
        </Text>
        <Image src={d1} />
        <br />
        <br />
        <Text size="md">
          Right now, each collection of green streets is an “island” for people
          who are only comfortable biking on low stress (LTS 1 or 2) roads or
          trails. They would not consider biking on the yellow segment, as it
          would feel unsafe or stressful.
        </Text>
        <Image src={d2} />
        <br />
        <br />
        <Text size="md">
          But if it was possible to convert the yellow LTS 3 segment into an LTS
          1 or 2 segment, by building a safer bicycle facility (whether that be
          a protected bike lane, a roadside trail, or some other measure), all
          of the neighborhood streets would now be connected via the newly
          converted low-stress segment. (This is what you're able to do by drawing segments using this tool.)
        </Text>
        <Image src={d3} />
        <br />
        <br />
        <Text size="md">
          By pulling census tract information, it is possible to create an
          estimate for how many people live in each low stress island. By
          totaling the number of people in each island, along with the people
          who actually live along the segment, a high level estimate for the
          number of people connected via the new segment can be achieved. That
          is to say, we can estimate how many people were previously on an
          "island", but could now bike to other segments.
        </Text>
        <Image src={d7} />
        <br />
        <br />
        <Text size="md">
          We can also estimate the number of jobs, transit stations, essential
          services, or nearby trail that could be connected if this segment was
          improved.
        </Text>
        <Image src={d8} />
        <br />
        <br />
        <Text size="lg">How does this work for sidewalks then? </Text>
        <Text size="md">
          The tool does the same for sidewalks when you are in pedestrian mode, by treating areas with sidewalks and marked crosswalks as 'low stress', and areas with no sidewalks and unmarked crosswalks as 'high stress.' Islands are created using the low stress areas, and then the same statistics can be calculated.
  
        </Text>
      </Modal>
      <Button onClick={open}>What is LTS?</Button>
    </>
  );
}

export default Explainer;
