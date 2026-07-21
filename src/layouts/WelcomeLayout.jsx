import Navbar from "../components/ui/Navbar";


export default function WelcomeLayout({ children }) {
  return (
    <div className="welcome-layout">

      {/* Navbar */}
      <header className="welcome-header">
        <Navbar />
      </header>

      {/* Contenido */}
      <main className="welcome-main">
        {children}
      </main>

      
    </div>
  );
}
