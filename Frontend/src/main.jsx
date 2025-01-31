import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-custom-alert";
import { Provider } from "react-redux";
import store from "./utility/Store.js";
import { IKContext } from "imagekitio-react";
import { publicKey, urlEndpoint } from "../env.js";
import authenticator from "./utility/ImageKit.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <Router>
        <ToastContainer floatingTime={3000} />
        <App />
      </Router>
    </IKContext>
  </Provider>
);
