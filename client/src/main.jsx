import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import "./assets/styles/antd-customize.scss"
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { StateProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={router} />
    </StateProvider>
  </React.StrictMode>
);
