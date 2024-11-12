import React from "react";
import { Tooltip, Image } from '@mantine/core';

import ltsLegend from "../../assets/Artboard 1.png"
import sidewalkLegend from "../../assets/Artboard 2.png"



function Legend({ connectionType }) {

  var legend = 'none'
  if (connectionType == 'bike') {
    legend = ltsLegend
  }
  else {
    legend = sidewalkLegend
  }
  return (
    <>
      <Tooltip
        multiline
        w={220}
        label="LTS represents Level of Traffic Stress for cyclists, with a '1' being the least stressful, and a '4' being the most stressful. Read more in the Getting Started Guide.">
        <Image
          radius="md"

          src={legend}
          style={{
            position: 'fixed',
            bottom: 30,
            right: 10,
            zIndex: 100,
            width: '200px',
            height: 'auto',
          }}
        />
      </Tooltip>
    </>
  );
}

export default Legend;
