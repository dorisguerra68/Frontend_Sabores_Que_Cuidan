import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { useAlimentos } from "./../hooks/useFood"; 
import { crearRegistroComida, listaRegistroComida } from "./../services/foodRegistrationService"; 

import "./../styles/index-global.css";
import "./../styles/Diary.css";

export const Diary = () => {
  const [selectedDay, setSelectedDay] = useState(16);
  const [activeMeal, setActiveMeal] = useState('Comida');
  const [busqueda, setBusqueda] = useState("");

  // Conectamos tu Hook de búsqueda de alimentos
  const { alimentos: resultados, cargando, error, buscarAlimentos, setAlimentos: limpiarResultados } = useAlimentos();

  // Estado dinámico conectado a la Base de Datos
  const [alimentosAñadidos, setAlimentosAñadidos] = useState({
    "Desayuno": [],
    "Media Mañana": [],
    "Comida": [],
    "Merienda": [],
    "Cena": []
  });

  // 🌟 RECUPERA DE TU BACKEND POSTGRESQL SOLO LOS ALIMENTOS DE HOY
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
              impacto: reg.impacto_glucemico || "Bajo",
              categoria: reg.alimento?.categoria || "general"
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

  // Manejador del buscador
  const handleInputChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.trim() === "") {
      limpiarResultados([]);
      return;
    }
    buscarAlimentos(valor); 
  };

  // 🌟 GUARDAR EN TU BASE DE DATOS REAL (FASTAPI)
  const agregarAlimento = async (alimento) => {
    const gramos = prompt(`¿Cuántos gramos de ${alimento.nombre} consumiste?`, "100");
    if (!gramos || isNaN(gramos)) return;

    const fechaParaPython = new Date().toISOString().split('.')[0]; 

    const nuevoRegistroPayload = {
      id_alimento: Number(alimento.id_alimento || alimento.id), 
      id_usuario: 1, 
      racion: Number(gramos),
      hora_comida: activeMeal, 
      fecha: fechaParaPython,      
      impacto_glucemico: "Bajo" 
    };

    try {
      const respuestaApi = await crearRegistroComida(nuevoRegistroPayload);

      setAlimentosAñadidos((prev) => ({
        ...prev,
        [activeMeal]: [
          ...prev[activeMeal],
          { 
            id: alimento.id_alimento || alimento.id,
            nombre: alimento.nombre, 
            gramosId: respuestaApi?.id_rgtcomida || Date.now(), 
            racion: Number(gramos),
            impacto: respuestaApi?.impacto_glucemico || "Bajo",
            categoria: alimento.categoria || "general"
          }
        ]
      }));

      setBusqueda("");
      limpiarResultados([]);
    } catch (err) {
      console.error("Error al registrar comida:", err); 
      alert("No se pudo guardar en la base de datos.");
    }
  };

  // Eliminar alimento localmente
  const handleDelete = (idUnico) => {
    setAlimentosAñadidos((prev) => ({
      ...prev,
      [activeMeal]: prev[activeMeal].filter((a) => a.gramosId !== idUnico)
    }));
  };

  // Iconos automáticos según categoría
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'verdura': return '🥦';
      case 'cereales': return '🌾';
      case 'carne': return '🥩';
      case 'fruta': return '🍎';
      case 'pescado': return '🐟';
      default: return '🍽️';
    }
  };

  const getGlycemicClass = (level) => {
    if (level === 'Bajo') return 'tag-low';
    if (level === 'Medio') return 'tag-medium';
    return 'tag-high';
  };

  // Cálculos dinámicos en tiempo real para tu gráfico de barras
  const listaActual = alimentosAñadidos[activeMeal] || [];
  const totalAlimentos = listaActual.length;

  const bajoCount = listaActual.filter(a => a.impacto === "Bajo").length;
  const medioCount = listaActual.filter(a => a.impacto === "Medio").length;
  const altoCount = listaActual.filter(a => a.impacto === "Alto").length;

  const pctBajo = totalAlimentos > 0 ? Math.round((bajoCount / totalAlimentos) * 100) : 65;
  const pctMedio = totalAlimentos > 0 ? Math.round((medioCount / totalAlimentos) * 100) : 28;
  const pctAlto = totalAlimentos > 0 ? Math.round((altoCount / totalAlimentos) * 100) : 7;

  return (
    <div className="diary-container-mvp">
      
      <header className="diary-header">
        <span className="current-month">JULIO 2026</span>
        <h2 className="main-title">Registro Diario</h2>
      </header>

      {/* Calendario Semanal */}
      <section className="week-selector">
        {[
          { day: 'L', num: 14 },
          { day: 'M', num: 15 },
          { day: 'X', num: 16 },
          { day: 'J', num: 17 },
          { day: 'V', num: 18 },
          { day: 'S', num: 19 },
          { day: 'D', num: 20 },
        ].map((item) => (
          <button 
            key={item.num} 
            className={`day-card ${selectedDay === item.num ? 'active' : ''}`}
            onClick={() => setSelectedDay(item.num)}
          >
            <span className="day-letter">{item.day}</span>
            <span className="day-number">{item.num}</span>
          </button>
        ))}
      </section>

      {/* Pestañas de Comidas */}
      <section className="meal-tabs">
        {['Desayuno', 'Media Mañana', 'Comida', 'Merienda', 'Cena'].map((meal) => {
          const cantidad = alimentosAñadidos[meal]?.length || 0;
          return (
            <button 
              key={meal} 
              className={`meal-tab ${activeMeal === meal ? 'active' : ''}`}
              onClick={() => {
                setActiveMeal(meal);
                setBusqueda("");
                limpiarResultados([]);
              }}
            >
              {meal}
              {cantidad > 0 && <span className="meal-count">{cantidad}</span>}
            </button>
          );
        })}
      </section>

      {/* Buscador Integrado */}
      <section className="search-bar-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar alimento..." 
            className="search-input" 
            value={busqueda}
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Dropdown de resultados de la API */}
      {cargando && <p style={{color: "blue", padding: "0 10px"}}>Buscando...</p>}
      {error && <p style={{color: "#b42318", padding: "0 10px"}}>{error}</p>}
      {resultados.length > 0 && (
        <div className="search-results-dropdown">
          {resultados.map((alimento) => (
            <div key={alimento.id || alimento.id_alimento} className="result-item">
              <span>{alimento.nombre}</span>
              <button onClick={() => agregarAlimento(alimento)} className="btn-add-inline">+</button>
            </div>
          ))}
        </div>
      )}

      {/* Lista de Alimentos de la Base de Datos */}
      <section className="added-foods-section">
        <div className="section-header">
          <h3>ALIMENTOS AÑADIDOS</h3>
          <span className="badge-count">{totalAlimentos} alimentos</span>
        </div>

        <div className="foods-list">
          {listaActual.map((food) => (
            <div key={food.gramosId} className="food-item">
              <div className="food-icon-wrapper">
                {getCategoryIcon(food.categoria)}
              </div>
              <div className="food-details">
                <h4>{food.nombre}</h4>
                <p>{food.racion}g • 13:30</p>
              </div>
              <span className={`tag ${getGlycemicClass(food.impacto)}`}>
                {food.impacto}
              </span>
              <button className="delete-btn" onClick={() => handleDelete(food.gramosId)}>
                <FaTrash />
              </button>
            </div>
          ))}

          {totalAlimentos === 0 && (
            <p className="empty-list-message">No hay alimentos registrados en {activeMeal}.</p>
          )}
        </div>
      </section>

      {/* Gráfico Horizontal Dinámico */}
      <section className="glycemic-dashboard">
        <div className="dashboard-header">
          <h3>NIVEL GLUCÉMICO · {activeMeal.toUpperCase()}</h3>
          <span className="badge-count">{totalAlimentos} alimentos</span>
        </div>

        <div className="horizontal-bar-chart">
          <div className="chart-segment low" style={{ width: `${pctBajo}%` }}></div>
          <div className="chart-segment medium" style={{ width: `${pctMedio}%` }}></div>
          <div className="chart-segment high" style={{ width: `${pctAlto}%` }}></div>
        </div>

        <div className="chart-legend">
          <span className="legend-item"><span className="dot low"></span> Bajo {pctBajo}%</span>
          <span className="legend-item"><span className="dot medium"></span> Medio {pctMedio}%</span>
          <span className="legend-item"><span className="dot high"></span> Alto {pctAlto}%</span>
        </div>

        <div className="dashboard-counters">
          <div className="counter-col">
            <span className="counter-num color-low">{totalAlimentos > 0 ? bajoCount : 3}</span>
            <span className="counter-label">BAJO</span>
          </div>
          <div className="counter-col">
            <span className="counter-num color-medium">{totalAlimentos > 0 ? medioCount : 1}</span>
            <span className="counter-label">MEDIO</span>
          </div>
          <div className="counter-col">
            <span className="counter-num color-high">{totalAlimentos > 0 ? altoCount : 0}</span>
            <span className="counter-label">ALTO</span>
          </div>
        </div>
      </section>

    </div>
  );
};

