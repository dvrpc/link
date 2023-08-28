import React, { useState } from "react";
import Logo from "../Logo/Logo";
import StudyShelf from "../StudyShelf/StudyShelf";
import ConnectionToggle from "../ConnectionToggle/ConnectionToggle";

function Toolbar({ connectionType, setConnectionType }) {
  return (
    <div className="toolbar">
      <Logo />
      <StudyShelf />
      <ConnectionToggle
        connectionType={connectionType}
        setConnectionType={setConnectionType}
      />
    </div>
  );
}

export default Toolbar;
