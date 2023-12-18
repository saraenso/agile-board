import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import RootStore from "./store/index.js";
import { CssBaseline } from "@mui/material";

const store = RootStore.create({});

export const StoreContext = createContext(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);
