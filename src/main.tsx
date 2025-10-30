import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import LoginForm from "./components/forms/LoginForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginForm />
  </StrictMode>
);
