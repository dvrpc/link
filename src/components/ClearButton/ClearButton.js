import { Button } from "@mantine/core";
import React, { useRef, useState } from "react";
import { clickClear } from "../Map/interaction";

function ClearButton({ map }) {
  const [featurelist, setFeatureList] = useState([]);
  const segIdsElementRef = useRef(null);

  const handleClick = () => {
    clickClear(map, featurelist, setFeatureList, segIdsElementRef.current);
  };

  return (
    <>
      <div id="segids" ref={segIdsElementRef}></div>
      <Button onClick={handleClick}>Clear</Button>
    </>
  );
}

export default ClearButton;
