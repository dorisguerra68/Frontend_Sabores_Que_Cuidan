import { Routes, Route } from "react-router-dom";
import PublicLayout from "../src/layouts/PublicLayouts";
import Welcome from "../src/pages/Welcome";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Welcome />
          </PublicLayout>
        }
      />
    </Routes>
  );
}
