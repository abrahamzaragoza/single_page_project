// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/custom.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "../containers/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Rails.start();
Turbolinks.start();
ActiveStorage.start();
