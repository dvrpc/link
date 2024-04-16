import React from "react";
import logo from "../../assets/1727_Link_logo_transparent.png";

function Logo({ logoWidth }) {
  console.log(logoWidth)
  return (
    <img
      src={logo}
      alt="White DVRPC Logo"
      style={{ width: logoWidth, height: "auto" }}
    />
  );
}

export default Logo;
