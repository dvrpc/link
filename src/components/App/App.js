import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { themeConfig } from "./mantineTheme";
import MainComponent from "../MainComponent/MainComponent";
import LoginPage from "../Authentication/LoginPage";
import AuthenticatedLayout from "../Authentication/AuthenticatedLayout";
import VerifyEmail from "../Authentication/VerifyEmail";
import Admin from "../Authentication/Admin";

export default function App() {
  return (
    <MantineProvider theme={themeConfig} withGlobalStyles>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticatedLayout requireAdmin={false}>
                <MainComponent />
              </AuthenticatedLayout>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <AuthenticatedLayout requireAdmin={true}>
                <Admin />
              </AuthenticatedLayout>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
