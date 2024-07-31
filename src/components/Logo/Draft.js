import React from "react";
import logo from "../../assets/draft.png";

function Draft({ logoWidth }) {
  console.log(logoWidth)
  return (
    <>
      <img
        src={logo}
        alt="Draft stamp"
        style={{ width: logoWidth, height: "auto" }}
      />
    </>
  );
}

export default Draft;
