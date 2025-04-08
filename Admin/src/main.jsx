import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-custom-alert";
import { Provider } from "react-redux";
// import store from "./utility/Store.js";
import store from "./Utils/Store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ToastContainer floatingTime={3000} />
      <App />
    </Router>
  </Provider>
);
