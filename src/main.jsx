/**
 * Application Entry Point (src/main.jsx)
 * Mounts the React 18 component tree into #root, with automatic fallback for headless test environments.
 */

import { App } from "./App.jsx";

(function bootstrap() {
  if (typeof document === "undefined") return;

  const rootEl = document.getElementById("root");
  if (
    rootEl &&
    typeof ReactDOM !== "undefined" &&
    typeof React !== "undefined" &&
    typeof document.createElement === "function"
  ) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
  } else if (typeof App.initDirectDom === "function") {
    App.initDirectDom();
  }
})();
