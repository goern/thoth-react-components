import App from "./App";
import { createRoot } from "react-dom/client";

test("renders", () => {
  const container = document.getElementById("app");
  const root = createRoot(container!);
  root.render(<App />);
});
