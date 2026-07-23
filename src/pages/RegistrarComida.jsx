import { useAlimentos } from "./../hooks/useAlimento"; 
import { useState } from "react";
import { FaSearch, FaUtensils, FaArrowLeft, FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"; 
// 👈 IMPORTAMOS EL SERVICIO DE GUARDAR
import { crearRegistroComida } from "./../services/RegistroComidaService"; // Ajusta la ruta a tu archivo de registro comida service
import "./../styles/Index-Global.css";
import "./../styles/RegistrarComida.css";
import "./../styles/Responsive-movil.css";
import "./../styles/Responsive-ordenador.css";

export default function RegistrarComida() {
  const comidas = ["Desayuno", "Media Mañana", "Comida", "Merienda", "Cena"];
  const [pestañaActiva, setPestañaActiva] = useState("Desayuno");
  const [busqueda, setBusqueda] = useState("");

  const { alimentos: resultados, cargando, error, buscarAlimentos, setAlimentos } = useAlimentos();

  const [alimentosAñadidos, setAlimentosAñadidos] = useState({
    "Desayuno": [],
    "Media Mañana": [],
    "Comida": [],
    "Merienda": [],
    "Cena": []
  });

  const handleInputChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    buscarAlimentos(valor); 
  };

  // 🚀 PASO 2: SELECCIONAR Y GUARDAR EN LA BASE DE DATOS ASÍNCRONAMENTE
  const agregarAlimento = async (alimento) => {
    const gramos = prompt(`¿Cuántos gramos de ${alimento.nombre} consumiste?`, "100");
    if (!gramos || isNaN(gramos)) return;

    // Estructuramos los datos tal cual los pide tu endpoint POST de registro_comida
    // Modifica las propiedades (id_alimento, tipo_comida, etc.) según requiera tu modelo de Python
    const nuevoRegistroPayload = {
      alimento_id: alimento.id || alimento.id_alimento, 
      cantidad_gramos: Number(gramos),
      momento_dia: pestañaActiva, // "Desayuno", "Comida", etc.
      fecha: new Date().toISOString()
    };

    try {
      // Enviamos asíncronamente los datos al backend usando tu servicio existente
      await crearRegistroComida(nuevoRegistroPayload);

      // Si el servidor acepta el registro, lo pintamos en la pantalla de la pestaña actual
      setAlimentosAñadidos((prev) => ({
        ...prev,
        [pestañaActiva]: [
          ...prev[pestañaActiva],
          { ...alimento, gramosId: Date.now(), cantidadGramos: Number(gramos) }
        ]
      }));

      alert(`¡${alimento.nombre} guardado con éxito en la Base de Datos!`);
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el registro en el servidor. Revisa la consola.");
    }

    setBusqueda("");
    setAlimentos([]);
  };

  const eliminarAlimento = (idUnico) => {
    setAlimentosAñadidos((prev) => ({
      ...prev,
      [pestañaActiva]: prev[pestañaActiva].filter((a) => a.gramosId !== idUnico)
    }));
  };

  return (
    <main className="registrar-layout">
      <div className="registrar-container">
        
        <header className="registrar__header">
          <Link to="/dashboard" className="btn-back">
            <FaArrowLeft /> Volver al panel
          </Link>
          <h1 className="registrar__title">Registrar alimentos</h1>
          <p className="registrar__subtitle">Selecciona el momento del día e ingresa lo que has consumido.</p>
        </header>

        <nav className="registrar__tabs">
          {comidas.map((comida) => (
            <button
              key={comida}
              className={`tab-btn ${pestañaActiva === comida ? "tab-btn--active" : ""}`}
              onClick={() => {
                setPestañaActiva(comida);
                setBusqueda(""); 
                setAlimentos([]);
              }}
            >
              <FaUtensils className="tab-icon" />
              {comida}
            </button>
          ))}
        </nav>

        <div className="registrar__content-box">
          <h2 className="current-tab-title">Momento actual: {pestañaActiva}</h2>
          
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar alimento (ej: Arroz integral, avena...)"
              value={busqueda}
              onChange={handleInputChange} 
              className="search-input"
            />
          </div>

          <div className="registrar__results-placeholder">
            
            {cargando && <p style={{ color: "blue", fontStyle: "italic" }}>Buscando coincidencias en la base de datos...</p>}
            {error && <p style={{ color: "red" }}>❌ Error al buscar: {error}</p>}

            {/* PASO 1: ENCONTRAR */}
            {resultados.length > 0 && (
              <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                <p style={{ fontWeight: "bold", margin: "5px 0" }}>Resultados encontrados en tu API:</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {resultados.map((alimento) => (
                    <li 
                      key={alimento.id || alimento.id_alimento} 
                      onClick={() => agregarAlimento(alimento)}
                      style={{ cursor: "pointer", padding: "8px", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <span><strong>{alimento.nombre}</strong></span>
                      <button style={{ background: "#4CAF50", color: "white", border: "none", borderRadius: "3px", padding: "2px 6px", cursor: "pointer" }}><FaPlus /></button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MOSTRAR LO AÑADIDO Y GUARDADO */}
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontWeight: "bold" }}>Alimentos añadidos a tu {pestañaActiva}:</p>
              {alimentosAñadidos[pestañaActiva].length === 0 ? (
                <p style={{ color: "#777", fontStyle: "italic" }}>No has añadido alimentos todavía.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {alimentosAñadidos[pestañaActiva].map((alimento) => (
                    <li key={alimento.gramosId} style={{ display: "flex", justifyContent: "space-between", background: "#eaf5ea", padding: "8px", borderRadius: "4px", marginBottom: "5px" }}>
                      <span>✅ {alimento.nombre} ({alimento.cantidadGramos}g)</span>
                      <button onClick={() => eliminarAlimento(alimento.gramosId)} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}>
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          <button className="btn btn-primary btn-calcular">
            Calcular impacto glucémico de la comida
          </button>
        </div>

        <nav className="dashboard__navigation-buttons">
          <Link to="/dashboard" className="btn-nav btn-nav--secondary">
            <FaArrowLeft /> Volver al Dashboard
          </Link>
          <Link to="/diario" className="btn-nav btn-nav--primary">
            Ir a Mi Diario <FaArrowRight />
          </Link>
        </nav>  

      </div>
    </main>
  );
}
