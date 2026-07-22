import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaBookOpen, FaSignOutAlt } from "react-icons/fa";

import Card from "./../components/ui/Card"; 
import "./../styles/Dashboard.css";

export default function Dashboard() {
  const [nombreUsuario] = useState("María");

  // 💡 1. LÓGICA DE LA FECHA FORMATEADA EN ESPAÑOL (Ej: Miércoles, 22 de julio de 2026)
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Tu lógica del saludo se queda exactamente igual
  const hora = new Date().getHours();
  let saludo;
  if (hora >= 6 && hora < 12) saludo = "Buenos días";
  else if (hora >= 12 && hora < 20) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  return (
    <main className="dashboard-layout">
      <div className="dashboard-container">
        
        <header className="dashboard__header">
          {/* 💡 2. AÑADIMOS LA FECHA EN LA PARTE SUPERIOR ANTES DEL SALUDO */}
          <span className="dashboard__date">{fechaActual}</span>

          <div className="dashboard__header-top">
            <h1 className="dashboard__greeting">
              {saludo}, <span className="username">{nombreUsuario}</span>
            </h1>
            <Link to="/" className="btn-logout">
              <FaSignOutAlt /> Salir
            </Link>
          </div>
          <p className="dashboard__subtitle">
            ¿Qué tal tu alimentación de hoy? Registra tus comidas para cuidar tu bienestar.
          </p>
        </header>

        {/* El resto del código de section con tus Cards se queda EXACTAMENTE IGUAL */}
        <section className="dashboard__grid">
          <Link to="/registrar-comida" className="dashboard__card-link">
            <Card
              title="Registrar comida"
              description="Añade lo que comes en tus 5 momentos del día y conoce tu impacto glucémico."
              icon={<FaPlusCircle />}
              variant="default"
            >
              <span className="card__action-btn">Entrar →</span>
            </Card>
          </Link>

          <Link to="/diario" className="dashboard__card-link">
            <Card
              title="Mi Diario"
              description="Revisa el histórico de tus registros diarios y la evolución de tus niveles."
              icon={<FaBookOpen />}
              variant="default"
            >
              <span className="card__action-btn">Entrar →</span>
            </Card>
          </Link>
        </section>

      </div>
    </main>
  );
}
