import { useState } from "react";
import { FaSearch, FaUtensils, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom"; // Para poder volver atrás con un botón
import "./../styles/Index-Global.css";
import "./../styles/RegistrarComida.css";
import "./../styles/Responsive-movil.css";
import "./../styles/Responsive-ordenador.css";

export default function RegistrarComida() {
  // Las 5 pestañas de comidas que planeamos
  const comidas = ["Desayuno", "Media Mañana", "Comida", "Merienda", "Cena"];
  const [pestañaActiva, setPestañaActiva] = useState("Desayuno");
  const [busqueda, setBusqueda] = useState("");

  // Este estado simulará el carrito de alimentos añadidos por pestaña en el MVP
  const [alimentosAñadidos, setAlimentosAñadidos] = useState({
    "Desayuno": [],
    "Media Mañana": [],
    "Comida": [],
    "Merienda": [],
    "Cena": []
  });

  return (
    <main className="registrar-layout">
      <div className="registrar-container">
        
        {/* BOTÓN VOLVER Y CABECERA */}
        <header className="registrar__header">
          <Link to="/dashboard" className="btn-back">
            <FaArrowLeft /> Volver al panel
          </Link>
          <h1 className="registrar__title">Registrar alimentos</h1>
          <p className="registrar__subtitle">Selecciona el momento del día e ingresa lo que has consumido.</p>
        </header>

        {/* 1. SISTEMA DE 5 PESTAÑAS (TABS) */}
        <nav className="registrar__tabs">
          {comidas.map((comida) => (
            <button
              key={comida}
              className={`tab-btn ${pestañaActiva === comida ? "tab-btn--active" : ""}`}
              onClick={() => setPestañaActiva(comida)}
            >
              <FaUtensils className="tab-icon" />
              {comida}
            </button>
          ))}
        </nav>

        {/* SECCIÓN OPERATIVA DE LA PESTAÑA SELECCIONADA */}
        <div className="registrar__content-box">
          <h2 className="current-tab-title">Momento actual: {pestañaActiva}</h2>
          
          {/* 2. EL BUSCADOR DE ALIMENTOS */}
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar alimento (ej: Arroz integral, avena...)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>

          {/* ESPACIO PARA LOS RESULTADOS DE BÚSQUEDA Y LISTA (Paso siguiente) */}
          <div className="registrar__results-placeholder">
            <p>Aquí se desplegarán las coincidencias de tu BD y los alimentos añadidos a tu {pestañaActiva}.</p>
          </div>

          {/* BOTÓN PRINCIPAL DE CÁLCULO */}
          <button className="btn btn-primary btn-calcular">
            Calcular impacto glucémico de la comida
          </button>
        </div>

      </div>
    </main>
  );
}
