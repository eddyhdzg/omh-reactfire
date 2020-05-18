import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseAppProvider } from "reactfire";
import "firebase/performance";

const config = {
  apiKey: "AIzaSyCFY-3sa6ZtM505lJ2OqPTEY2ACA4JsNAM",
  authDomain: "omh-test-4.firebaseapp.com",
  databaseURL: "https://omh-test-4.firebaseio.com",
  projectId: "omh-test-4",
  storageBucket: "omh-test-4.appspot.com",
  messagingSenderId: "985667232236",
  appId: "1:985667232236:web:d941ef569ae4d9d3a6a0c9",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
