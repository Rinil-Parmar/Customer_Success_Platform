import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap your App component with Auth0Provider */}
    <Auth0Provider
      domain="dev-twrzck2hag6l1yfu.us.auth0.com"
      clientId="3Ijd6paF7RvvpRnVltmlaLdochukdAA0"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
