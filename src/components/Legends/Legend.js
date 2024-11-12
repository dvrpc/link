import React from "react";
import { Tooltip, Image } from '@mantine/core';

import ltsLegend from "../../assets/Artboard 1.png"
import sidewalkLegend from "../../assets/Artboard 2.png"



function Legend({ connectionType }) {

  var legend = 'none'
  var label = 'none'
  if (connectionType == 'bike') {
    legend = ltsLegend
    label = "LTS represents Level of Traffic Stress for cyclists, with a '1' being the least stressful, and a '4' being the most stressful. Read more in the Getting Started Guide. Your study and the low-stress area are visible when you draw or view one of your studies."
  }
  else {
    legend = sidewalkLegend
    label = "Sidewalks are shown in green, unmarked crosswalks are shown in red. Draw a study to see the low-stress area it would connect!Your study and the low-stress area are visible when you draw or view one of your studies."
  }
  return (
    <>
      <Tooltip
        multiline
        w={220}
        label={label}>
        <Image
          radius="md"

          src={legend}
          style={{
            position: 'fixed',
            bottom: 30,
            right: 10,
            zIndex: 100,
            width: '250px',
            height: 'auto',
          }}
        />
      </Tooltip>
    </>
  );
}

export default Legend;
