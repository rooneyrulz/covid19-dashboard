import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import "antd/dist/antd.css";
import "./main.scss";

if (import.meta.env.PROD) console.log = function () {};

ReactDOM.createRoot(
  document.getElementById("covid19_dashboard") as HTMLElement
).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
