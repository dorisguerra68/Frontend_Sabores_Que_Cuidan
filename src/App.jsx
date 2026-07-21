import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/WelcomeLayout";
import Welcome from "./pages/Welcome";

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
