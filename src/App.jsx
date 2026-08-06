import { Routes, Route } from "react-router-dom";
import WelcomeLayout from "./layouts/WelcomeLayout";
import Welcome from "./pages/Welcome";
import RegisterLayout from "./layouts/RegisterLayout"; // Tu layout reutilizable

// 💡 Importamos tus páginas reales existentes
import Dashboard from "./pages/Dashboard";
import RegisterFood from "./pages/RegisterFood";
import { Diary } from "./pages/Diary"; // Tu archivo del Diario

export default function App() {
  return (
    <Routes>
      {/* 1. Pantalla de Bienvenida */}
      <Route
        path="/"
        element={
          <WelcomeLayout>
            <Welcome />
          </WelcomeLayout>
        }
      />

      {/* 2. Dashboard Principal (Envuelto en tu Layout) */}
      <Route
        path="/dashboard"
        element={
          <RegisterLayout>
            <Dashboard />
          </RegisterLayout>
        }
      />

      {/* 3. Registrar Comida (Envuelto en tu Layout) */}
      <Route
        path="/registrar-comida"
        element={
          <RegisterLayout>
            <RegisterFood />
          </RegisterLayout>
        }
      />

      {/* 4. Mi Diario (Envuelto en tu Layout) */}
      <Route
        path="/diario"
        element={
          <RegisterLayout>
            <Diary />
          </RegisterLayout>
        }
      />
    </Routes>
  );
}
