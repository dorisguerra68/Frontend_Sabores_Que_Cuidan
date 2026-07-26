import { useAlimentos } from "./../hooks/useAlimento"; 
import { useState, useEffect } from "react"; 
import { FaSearch, FaUtensils, FaArrowLeft, FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { crearRegistroComida, listaRegistroComida } from "./../services/RegistroComidaService"; 

import "./../styles/index-global.css";
import "./../styles/RegistrarComida.css";
import "./../styles/responsive-ordenador.css";
import "./../styles/responsive-movil.css";

export default function RegistrarComida() {
  const comidas = ["Desayuno", "Media Mañana", "Comida", "Merienda", "Cena"];
  const [pestañaActiva, setPestañaActiva] = useState("Desayuno");
  const [busqueda, setBusqueda] = useState("");

  const { alimentos: resultados, cargando, error, buscarAlimentos, setAlimentos: limpiarResultados } = useAlimentos();

  const [alimentosAñadidos, setAlimentosAñadidos] = useState({
    "Desayuno": [],
    "Media Mañana": [],
    "Comida": [],
    "Merienda": [],
    "Cena": []
  });

  // 🌟 Recupera de la Base de Datos SOLO los alimentos guardados el día de HOY
  useEffect(() => {
    const recuperarRegistrosFormateados = async () => {
      try {
        const registrosBackend = await listaRegistroComida();
        
        const mapaTemporal = {
          "Desayuno": [],
          "Media Mañana": [],
          "Comida": [],
          "Merienda": [],
          "Cena": []
        };

        const hoyString = new Date().toISOString().split('T')[0];

        registrosBackend.forEach((reg) => {
          const fechaRegistroString = reg.fecha.split('T')[0];

                    if (fechaRegistroString === hoyString && mapaTemporal[reg.hora_comida]) {
            mapaTemporal[reg.hora_comida].push({
              id: reg.id_alimento,
              nombre: reg.alimento?.nombre || "Alimento", 
              gramosId: reg.id_rgtcomida, 
              racion: Number(reg.racion),
              impacto: reg.impacto_glucemico
            });
          }
        });

        setAlimentosAñadidos(mapaTemporal);

      } catch (err) {
        console.error("Error al sincronizar los alimentos del día:", err);
      }
    };

    recuperarRegistrosFormateados();
  }, []); 

  const handleInputChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.trim() === "") {
      limpiarResultados([]);
      return;
    }
    buscarAlimentos(valor); 
  };

  const agregarAlimento = async (alimento) => {
    const gramos = prompt(`¿Cuántos gramos de ${alimento.nombre} consumiste?`, "100");
    if (!gramos || isNaN(gramos)) return;

        const fechaISO = new Date().toISOString(); 
    const fechaParaPython = fechaISO.split('.')[0];

        let horaComidaFormateada = pestañaActiva.charAt(0).toUpperCase() + pestañaActiva.slice(1).toLowerCase();
    if (horaComidaFormateada === "Media mañana") {
      horaComidaFormateada = "Media Mañana";
    }

    const nuevoRegistroPayload = {
      id_alimento: Number(alimento.id_alimento || alimento.id), 
      id_usuario: 1,
      racion: Number(gramos),
      hora_comida: horaComidaFormateada,
      fecha: fechaParaPython,      
      impacto_glucemico: "Bajo"
    };

    try {
            const respuestaApi = await crearRegistroComida(nuevoRegistroPayload);

      setAlimentosAñadidos((prev) => ({
        ...prev,
        [pestañaActiva]: [
          ...prev[pestañaActiva],
          { 
            id: alimento.id_alimento || alimento.id,
            nombre: alimento.nombre, 
            gramosId: respuestaApi?.id_rgtcomida || Date.now(),
            racion: Number(gramos),
            impacto: respuestaApi?.impacto_glucemico || "Bajo"
          }
        ]
      }));

      alert(`¡${alimento.nombre} guardado con éxito en la Base de Datos!`);
      setBusqueda("");
      limpiarResultados([]);

    } catch (err) {
      console.error("Error técnico al registrar comida:", err); 
      alert("Lo sentimos, no se pudo guardar tu alimento en este momento.");
    }
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
                limpiarResultados([]);
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
            
            {cargando && <p style={{ color: "blue", fontStyle: "italic" }}>Buscando...</p>}
            {error && <p style={{ color: "red" }}>❌ Error al buscar: {error}</p>}

            {/* LISTADO DE OPCIONES ENCONTRADAS */}
            {resultados.length > 0 && (
              <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                <p style={{ fontWeight: "bold", margin: "5px 0" }}>Resultados encontrados en tu API:</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {resultados.map((alimento) => (
                    <li 
                      key={alimento.id || alimento.id_alimento} 
                      style={{ padding: "8px", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <span><strong>{alimento.nombre}</strong></span>
                      <button 
                        onClick={() => agregarAlimento(alimento)}
                        style={{ background: "#4CAF50", color: "white", border: "none", borderRadius: "3px", padding: "4px 8px", cursor: "pointer" }}
                      >
                        <FaPlus /> Añadir
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECCIÓN DONDE SE RENDERIZAN LOS ALIMENTOS REGISTRADOS */}
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontWeight: "bold" }}>Alimentos añadidos a tu {pestañaActiva}:</p>
              {alimentosAñadidos[pestañaActiva].length === 0 ? (
                <p style={{ color: "#777", fontStyle: "italic" }}>No has añadido alimentos todavía.</p>
              ) : (
                <ul className="comidas-lista">
                  {alimentosAñadidos[pestañaActiva].map((alimento) => {
                                        let claseColor = "circulo-bajo"; 
                    if (alimento.impacto === "Medio") claseColor = "circulo-medio"; 
                    if (alimento.impacto === "Alto") claseColor = "circulo-alto";   

                    return (
                      <li key={alimento.gramosId} className="comida-item">
<span>{alimento.nombre} ({alimento.racion}g) - <span className={claseColor}>{alimento.impacto}</span></span>
                        
                                                 <button 
                          onClick={() => eliminarAlimento(alimento.gramosId)} 
                          className="btn-eliminar-comida"
                          title="Eliminar alimento"
                        >
                          <FaTrash />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* 🚀 BOTONES RADICALES DE NAVEGACIÓN (Estrategia de Entrega Rápida) */}
      <nav className="dashboard__navigation-buttons">
        <Link to="/" className="btn-nav btn-nav--secondary">
          <FaArrowLeft /> Volver al Inicio
        </Link>
        <Link to="/registrar-comida" className="btn-nav btn-nav--primary">
          Avanzar <FaArrowRight />
        </Link>
      </nav>
    </main>
  );
}