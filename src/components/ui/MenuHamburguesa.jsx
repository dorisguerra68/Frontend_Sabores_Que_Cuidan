import { useState } from "react";
import "../../styles/MenuHamburguesa.css";

export function MenuHamburguesa() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu-container">
      {/* Botón de las 3 líneas */}
      <button 
        className={`hamburger-button ${isOpen ? "is-active" : ""}`} 
        onClick={toggleMenu}
        aria-label="Abrir menú de navegación"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {/* Menú desplegable lateral (Overlay) */}
      <nav className={`hamburger-nav ${isOpen ? "is-open" : ""}`}>
        <ul className="hamburger-links">
          <li>
            <a href="/" onClick={() => setIsOpen(false)}>Inicio / Welcome</a>
          </li>
          <li>
            <a href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</a>
          </li>
          <li>
            <a href="/alimentos" onClick={() => setIsOpen(false)}>Alimentos</a>
          </li>
          <li>
            <a href="/perfil" onClick={() => setIsOpen(false)}>Mi Perfil</a>
          </li>
        </ul>
      </nav>

      /* Fondo translúcido de seguridad que cierra el menú al hacer clic fuera */
      {isOpen && <div className="menu-backdrop" onClick={toggleMenu}></div>}
    </div>
  );
}
