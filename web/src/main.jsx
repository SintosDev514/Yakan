import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ClerkProvider } from "@clerk/react";

const PublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PublishableKey) {
  throw new Error("Missing Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider PublishableKey={PublishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>,
);
