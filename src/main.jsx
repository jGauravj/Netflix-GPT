import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <Theme
        accentColor="tomato"
        grayColor="olive"
        radius="large"
        scaling="95%"
        appearance="dark"
      >
        <App />
        {/* <ThemePanel /> */}
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
);
