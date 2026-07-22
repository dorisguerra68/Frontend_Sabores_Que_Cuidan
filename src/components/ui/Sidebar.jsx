import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCoffee,
  FiBookOpen,
  FiStar,
  FiBook,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

import "./Sidebar.css";

export default function Sidebar() {
  const user = {
    nombre: "María García",
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <FiHome className="sidebar-logo-icon" />
        <span>Sabores que Cuidan</span>
      </div>

      {/* Menú */}
      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiHome />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/registrar-comida"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiCoffee />
          <span>Registrar comida</span>
        </NavLink>

        <NavLink
          to="/mi-diario"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiBookOpen />
          <span>Mi Diario</span>
        </NavLink>

        <NavLink
          to="/recomendaciones"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiStar />
          <span>Recomendaciones</span>
        </NavLink>

        <NavLink
          to="/recetas"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiBook />
          <span>Recetas</span>
        </NavLink>

      </nav>

      {/* Usuario */}
      <div className="sidebar-user">
        <div className="sidebar-user-info">
          <FiUser />
          <span>{user.nombre}</span>
        </div>

        <button className="logout-button">
          <FiLogOut />
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}
