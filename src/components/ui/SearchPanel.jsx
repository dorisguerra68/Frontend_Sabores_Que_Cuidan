import React from "react";

export function SearchPanel({ busqueda, onChange, resultados, cargando, error, onAdd }) {
  return (
    <>
      <section className="search-bar-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar alimento..."
            className="search-input"
            value={busqueda}
            onChange={onChange}
          />
        </div>
      </section>

      {cargando && <p style={{ color: "blue", padding: "0 10px" }}>Buscando...</p>}
      {error && <p style={{ color: "red", padding: "0 10px" }}>Error en la búsqueda.</p>}

      {resultados.length > 0 && (
        <div className="search-results-dropdown">
          {resultados.map((alimento) => (
            <div key={alimento.id || alimento.id_alimento} className="result-item">
              <span>{alimento.nombre}</span>
              <button onClick={() => onAdd(alimento)} className="btn-add-inline" type="button">
                +
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
