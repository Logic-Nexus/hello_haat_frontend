import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./Store/ReduxProvider/ReduxProvider.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <App />
      <ToastContainer />
    </ReduxProvider>
  </StrictMode>
);
