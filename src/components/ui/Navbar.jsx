import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Sabores que Cuidan
        </Link>

        {/* Desktop menu */}
        <div className="navbar-links">
          <Link to="/sobre-la-app">Sobre la app</Link>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register" className="navbar-button">
            Crear cuenta
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="navbar-mobile">
          <Link to="/sobre-la-app" onClick={() => setOpen(false)}>
            Sobre la app
          </Link>

          <Link to="/login" onClick={() => setOpen(false)}>
            Iniciar sesión
          </Link>

          <Link
            to="/register"
            className="navbar-button"
            onClick={() => setOpen(false)}
          >
            Crear cuenta
          </Link>
        </div>
      )}
    </nav>
  );
}
