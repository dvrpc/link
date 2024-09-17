import React from "react";
import logo from "../../assets/dvrpc_white_logo.png";

function Draft({ logoWidth }) {
  console.log(logoWidth)
  return (
    <>
      <a href="https://www.dvrpc.org/">
        <img
          src={logo}
          alt="DVRPC Logo"
          style={{ width: logoWidth, height: "auto" }}
        />
      </a>
    </>
  );
}

export default Draft;
