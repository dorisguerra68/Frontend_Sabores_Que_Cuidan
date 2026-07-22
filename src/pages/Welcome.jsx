import { Link } from "react-router-dom"; // 💡 Añadido el import necesario para los enlaces
import "./../styles/Index-Global.css";
import "./../styles/Welcome.css";
import "./../styles/Responsive-movil.css";
import "./../styles/Responsive-ordenador.css";
import comer1 from "./../assets/images/comer1.png";
import logo2 from "./../assets/images/logo2.png";

export default function Welcome() {
  return (
    <main className="welcome">
      <div className="welcome__container">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO */}
        <section className="welcome__content">
          <div className="brand__logo">
            <img src={logo2} alt="Logo de Sabores que Cuidan" />
          </div>

          <h1 className="hero__title">Sabores que Cuidan</h1>
          
          <p className="hero__description">
            Controla tu respuesta insulínica a través de lo que comes.
          </p>

          <div className="hero__buttons">
            <Link to="/dashboard" className="btn btn-primary">
              Entrar →
            </Link>
            <Link to="/registrar-comida" className="btn btn-secondary">
              Más información
            </Link>
          </div> {/* 💡 Este div cierra correctamente a .hero__buttons */}
          
        </section> {/* 💡 Eliminamos el div huérfano que rompía el código aquí */}

        {/* COLUMNA DERECHA: IMAGEN */}
        <section className="welcome__image-section">
          <img
            src={comer1}
            alt="Familia disfrutando una comida saludable"
            className="welcome__image-photo"
          />
        </section>

      </div>
    </main>
  );
}
