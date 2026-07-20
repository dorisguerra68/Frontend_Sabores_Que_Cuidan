import Footer from "../components/ui/Footer";
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen font-sqc bg-sqc-cream text-sqc-dark flex flex-col">


      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-sqc-green">
            Sabores que Cuidan
          </h1>

          <div className="flex items-center gap-6 text-sqc-dark">
            <a href="/" className="hover:text-sqc-green transition">Inicio</a>
            <a href="/sobre-la-app" className="hover:text-sqc-green transition">Sobre la app</a>
            <a href="/login" className="hover:text-sqc-green transition">Acceder</a>
          </div>
        </nav>
      </header>

      {/* Contenido */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
