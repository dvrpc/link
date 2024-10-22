import React from "react";
import logo from "../../assets/1727_Link_logo_transparent.png";

function Logo({ logoWidth }) {
  console.log(logoWidth)
  return (
    <>
      <a href="/webmaps/link">
        <img
          src={logo}
          alt="DVRPC LINK Logo"
          style={{ width: logoWidth, height: "auto" }}
        />
      </a>
    </>
  );
}

export default Logo;
