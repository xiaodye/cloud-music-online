import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "@/styles/theme.css.ts";
import "@/styles/theme.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
