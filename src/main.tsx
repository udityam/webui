import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./App.tsx";
import "./index.css";

const token =
  sessionStorage.getItem("token") ||
  localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${token}`;
}

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(<App />);