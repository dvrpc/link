import React from "react";
import logo from "../../assets/dvrpc_white_logo.png";

function Logo() {
  return (
    <a href="https://dvrpc.org/">
      <img
        src={logo}
        className="logo"
        alt="Delaware Valley Regional Planning Commission white logo"
      />
    </a>
  );
}

export default Logo;
