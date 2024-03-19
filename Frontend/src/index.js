import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <React.StrictMode>
    {/* Wrap your App component with Auth0Provider */}
    <Auth0Provider
      domain="dev-twrzck2hag6l1yfu.us.auth0.com"
      clientId="3Ijd6paF7RvvpRnVltmlaLdochukdAA0"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
