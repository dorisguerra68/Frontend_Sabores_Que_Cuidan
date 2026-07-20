export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 text-center text-sm text-sqc-dark">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Marca */}
        <p className="font-semibold text-sqc-green">
          Sabores que Cuidan
        </p>

        {/* Enlaces */}
        <div className="flex items-center gap-6 text-sqc-dark">
          <a href="/indice-insulinico" className="hover:text-sqc-green transition">
            Índice insulínico
          </a>
          <a href="/recetas" className="hover:text-sqc-green transition">
            Recetas saludables
          </a>
          <a href="/evolucion" className="hover:text-sqc-green transition">
            Tu evolución
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2026 Sabores que Cuidan · Salud y bienestar
        </p>
      </div>
    </footer>
  );
}

