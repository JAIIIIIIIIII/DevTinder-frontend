//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./utils/userContext.jsx";
import { SocketProvider } from "./utils/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <AuthContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthContextProvider>
  </Provider>
);
