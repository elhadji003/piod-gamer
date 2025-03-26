import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import "./css/global.css";
import "animate.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
