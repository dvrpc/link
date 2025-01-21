import React from "react";
import "./Ping.css";

const Ping = ({ color }) => {
  return (
    <div class="container">
      <span class="heartbeat"></span>
      <span class="dot"></span>
    </div>
  );
};

export default Ping;
