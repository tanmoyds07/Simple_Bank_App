import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
