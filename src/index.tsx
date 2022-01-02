import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";

console.log(process.env.NODE_ENV);

function basename() {
  return process.env.NODE_ENV === "development" ? "/" : "/tempo-of-darkness";
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={basename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
