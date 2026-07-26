import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUtensils, FaArrowLeft, FaPlus, FaTrash, FaArrowRight,FaSignOutAlt,  FaPlusCircle,  FaBookOpen   } from "react-icons/fa";

import Card from "./../components/ui/Card"; 
import "./../styles/Dashboard.css";

export default function Dashboard() {
  const [nombreUsuario] = useState("María");

  // LÓGICA DE LA FECHA FORMATEADA EN ESPAÑOL
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Lógica del saludo según la hora
  const hora = new Date().getHours();
  let saludo;
  if (hora >= 6 && hora < 12) saludo = "Buenos días";
  else if (hora >= 12 && hora < 20) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  return (
    <main className="dashboard-layout">
      <div className="dashboard-container">
        
        {/* Cabecera interna con saludo y fecha */}
        <header className="dashboard__header">
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

        {/* Grid de Tarjetas principales */}
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

        {/* 🚀 BOTONES RADICALES DE NAVEGACIÓN (Estrategia de Entrega Rápida) */}
        <nav className="dashboard__navigation-buttons">
          <Link to="/" className="btn-nav btn-nav--secondary">
            <FaArrowLeft /> Volver al Inicio
          </Link>
          <Link to="/registrar-comida" className="btn-nav btn-nav--primary">
            Avanzar <FaArrowRight />
          </Link>
        </nav>

      </div>
    </main>
  );
}
