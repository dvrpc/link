import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { themeConfig } from "./mantineTheme";
import MainComponent from "../MainComponent/MainComponent";
import LoginPage from "../Authentication/LoginPage";
import AuthenticatedLayout from "../Authentication/AuthenticatedLayout";
import VerifyEmail from "../Authentication/VerifyEmail";
import Admin from "../Authentication/Admin";
import SharedStudy from "../SharedStudy/SharedStudy";

export default function App() {
  const [themeType, setThemeType] = useState("dark");

  const toggleTheme = () => {
    setThemeType(themeType === "dark" ? "light" : "dark");
  };

  const currentThemeConfig = {
    ...themeConfig,
    colorScheme: themeType,
  };

  const StudyPageRoute = () => {
    const { username, schema, studyId } = useParams();
    return (
      <SharedStudy username={username} schema={schema} studyId={studyId} />
    );
  };

  return (
    <MantineProvider theme={currentThemeConfig} withGlobalStyles>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticatedLayout requireAdmin={false}>
                <MainComponent onToggleTheme={toggleTheme} />
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
          <Route
            path="/user/:username/:schema/study/:studyId"
            element={<StudyPageRoute />}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
