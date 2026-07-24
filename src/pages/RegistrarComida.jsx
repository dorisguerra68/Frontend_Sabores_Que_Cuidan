import { useAlimentos } from "./../hooks/useAlimento"; 
import { useState, useEffect } from "react"; // 🌟 Importamos useEffect desde React
import { FaSearch, FaUtensils, FaArrowLeft, FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { crearRegistroComida, listaRegistroComida } from "./../services/RegistroComidaService"; 
import "./../styles/Index-Global.css";
import "./../styles/RegistrarComida.css";
import "./../styles/Responsive-movil.css";
import "./../styles/Responsive-ordenador.css";

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

  // 🌟  recupera de la Base de Datos los alimentos guardados al cargar la página
  // 🌟 ACTUALIZADO: Recupera de la Base de Datos SOLO los alimentos guardados el día de HOY
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

        // Obtenemos la fecha de hoy en formato local (AAAA-MM-DD) para comparar de forma limpia
        const hoyString = new Date().toISOString().split('T')[0];

        registrosBackend.forEach((reg) => {
          // Extraemos solo la parte de la fecha del registro (AAAA-MM-DD)
          const fechaRegistroString = reg.fecha.split('T')[0];

          // 🌟 FILTRO REGLA DE ORO: Solo se muestra en las pestañas si se registró HOY
          if (fechaRegistroString === hoyString && mapaTemporal[reg.hora_comida]) {
            mapaTemporal[reg.hora_comida].push({
              id: reg.id_alimento,
              nombre: reg.alimento?.nombre || "Alimento", 
              gramosId: reg.id_rgtcomida, 
              racion: Number(reg.racion)
            });
          }
        });

        setAlimentosAñadidos(mapaTemporal);

      } catch (err) {
        console.error("Error al sincronizar los alimentos del día:", err);
      }
    };

    recuperarRegistrosFormateados();
  }, []); // Se ejecuta una sola vez al entrar a la pantalla


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

    const nuevoRegistroPayload = {
      id_alimento: alimento.id || alimento.id_alimento, 
      racion: Number(gramos),
      hora_comida: pestañaActiva, 
      fecha: new Date().toISOString()
    };

    try {
      await crearRegistroComida(nuevoRegistroPayload);

      setAlimentosAñadidos((prev) => ({
        ...prev,
        [pestañaActiva]: [
          ...prev[pestañaActiva],
          { 
            id: alimento.id || alimento.id_alimento,
            nombre: alimento.nombre, 
            gramosId: Date.now(), 
            racion: Number(gramos) // Guardamos simétrico como racion
          }
        ]
      }));

      alert(`¡${alimento.nombre} guardado con éxito en la Base de Datos!`);
      
      setBusqueda("");
      limpiarResultados([]);

    } catch (err) {
      console.error("Error técnico al registrar comida:", err);
      alert("Lo sentimos, no se pudo guardar tu alimento en este momento. Por favor, comprueba tu conexión e inténtalo de nuevo.");
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
            
            {cargando && <p style={{ color: "blue", fontStyle: "italic" }}>Buscando coincidencias en la base de datos...</p>}
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
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {alimentosAñadidos[pestañaActiva].map((alimento) => (
                    <li key={alimento.gramosId} style={{ display: "flex", justifyContent: "space-between", background: "#eaf5ea", padding: "8px", borderRadius: "4px", marginBottom: "5px" }}>
                      {/* 🌟 CORREGIDO: Cambiado cantidadGramos por racion para ver el número real de gramos */}
                      <span>✅ {alimento.nombre} ({alimento.racion}g)</span>
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