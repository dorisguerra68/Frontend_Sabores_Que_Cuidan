import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-green-700">
          Sabores que Cuidan
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/sobre-la-app" className="hover:text-green-600 transition-colors">
            Sobre la app
          </Link>

          <Link to="/login" className="hover:text-green-600 transition-colors">
            Iniciar sesión
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
          >
            Crear cuenta
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-2 pb-4 text-gray-700">
          <Link
            to="/sobre-la-app"
            className="hover:text-green-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Sobre la app
          </Link>

          <Link
            to="/login"
            className="hover:text-green-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Iniciar sesión
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all w-fit"
            onClick={() => setOpen(false)}
          >
            Crear cuenta
          </Link>
        </div>
      )}
    </nav>
  );
}
