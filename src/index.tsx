import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

bridge.send("VKWebAppInit");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => { }); //runtime download
}
