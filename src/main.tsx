import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TransactionProvider }
  from "./context/TransactionContext";

import App from "./App";
import "./index.css";
import { ThemeProvider }
  from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);