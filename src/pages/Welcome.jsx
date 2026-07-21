import "./../styles/index-global.css";
import "./../styles/welcome.css";
import "./../styles/responsive-movil.css";
import "./../styles/responsive-ordenador.css";
import comer1 from "./../assets/images/comer1.png";
import logo2 from "./..//assets/images/logo2.png";
/*import { Link } from "react-router-dom";*/

export default function Welcome() {
  return (
    <main className="welcome">

      <section className="welcome__container">

        {/* ---------- COLUMNA IZQUIERDA ---------- */}

          <div className="welcome__content">

          {/* Logo */}

            <div className="brand">

            <div className="brand__logo">
              <img src={logo2} alt="Logo de la marca" />
            </div>

            <div className="hero__title">
              <h1>Sabores que Cuidan</h1>
            </div>
            <div className="badge">
              <p>Salud · Nutrición · Bienestar</p>
            </div>

          </div>

          {/* ---------- TEXTO Y BOTONES ---------- */}

          {/* Título */}

          <h3 className="brand__text">
            Comer sano
            <br />
            <span>no es dejar</span>
            <br />
            de disfrutar
          </h3>

          {/* Texto */}

          <p className="hero__description">
            Registra lo que comes, descubre tu respuesta
            insulínica y recibe recomendaciones adaptadas
            a tu perfil de salud.
          </p>

          {/* Botones */}

          <div className="hero__buttons">

            <button className="btn btn-primary">
              Crear cuenta →
            </button>

            <button className="btn btn-secondary">
              Iniciar sesión
            </button>

          </div>


        </div>
        </section>

        {/* ---------- COLUMNA DERECHA ---------- */}

       
        <section className="welcome__image-section">
        
        <div className="welcome__image">

          <img
            src={comer1}
            alt="Familia disfrutando una comida saludable"
            className="welcome__image-photo"
          />
        </div>
        </section>
        
          {/* Tarjeta flotante */}

          <div className="result-card">

            <span className="result-card__label">
              Resultado de ejemplo
            </span>

            <h3>Índice glucémico estimado</h3>

            <div className="result-card__value">
              🟢 Bajo
            </div>

            <p>
              Excelente elección. Mantén una alimentación
              equilibrada.
            </p>

         

        

        </div>

      

    </main>
  );
}