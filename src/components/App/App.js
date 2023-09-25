import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { themeConfig } from "./mantineTheme";
import MainComponent from "../MainComponent/MainComponent";
import Login from "../Authentication/Login";

export default function App() {
  return (
    <MantineProvider theme={themeConfig} withGlobalStyles>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainComponent />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
