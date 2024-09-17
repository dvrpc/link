import React from "react";
import { Image } from '@mantine/core';

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
  );
}

export default Legend;
