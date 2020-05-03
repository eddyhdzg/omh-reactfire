import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./components/App";
import { FirebaseAppProvider } from "reactfire";
import config from "./components/firebase/firebase.config";
import { AppProvider } from "./components/store";

ReactDOM.render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <AppProvider>
        <App />
      </AppProvider>
    </FirebaseAppProvider>
  </StrictMode>,
  document.getElementById("root")
);
