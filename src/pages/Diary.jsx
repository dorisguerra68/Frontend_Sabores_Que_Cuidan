import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome, FaCalendarAlt } from "react-icons/fa";
import "./../styles/Index-Global.css";
import "./../styles/Responsive-movil.css";
import "./../styles/Responsive-ordenador.css";
import "./../styles/Diary.css"

export default function Diario() {
  return (
    <main className="diario-layout">
      <div className="diario-container">
        
        {/* CABECERA */}
        <header className="diario__header">
          <Link to="/dashboard" className="btn-back">
            <FaArrowLeft /> Volver al panel
          </Link>
          <h1 className="diario__title">Mi Diario</h1>
          <p className="diario__subtitle">Historial cronológico de tus comidas e impacto glucémico acumulado.</p>
        </header>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="diario__content-box">
          <div className="diario__placeholder">
            <FaCalendarAlt className="placeholder-icon" />
            <h3>Aún no tienes registros hoy</h3>
            <p>Cuando calcules el impacto de una comida en la sección de registro, aparecerá guardada de forma ordenada en este calendario diario.</p>
            <Link to="/registrar-comida" className="btn btn-primary" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem' }}>
              Registrar mi primera comida
            </Link>
          </div>
        </div>
        {/* 🚀 BOTONES DE NAVEGACIÓN HÍBRIDOS */}
        <nav className="dashboard__navigation-buttons">
          <Link to="/registrar-comida" className="btn-nav btn-nav--secondary">
            <FaArrowLeft /> Volver a Registrar
          </Link>
          <Link to="/dashboard" className="btn-nav btn-nav--primary">
            <FaHome /> Ir al Panel Principal
          </Link>
        </nav>

      </div>
    </main>
  );
}

