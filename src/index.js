import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Todos from "./Pages/Todos";
import isAuthenticated from "./utils/ProtectedRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/todos"
          element={
            isAuthenticated() ? (
              <div className="flex items-center justify-center h-screen">
                <Todos />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </React.StrictMode>
  </Router>
);

reportWebVitals();
