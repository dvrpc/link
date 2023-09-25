import React from "react";
import { createRoot } from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./components/App/App.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-m3mawqu2lofskvrl.us.auth0.com"
    clientId="9uewlCua7Acm6jLOWPXd9SQnyNvqJABt"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>,
);
