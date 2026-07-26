import React from "react";
import { FaTrash } from "react-icons/fa";

export function AddedFoodsSection({ listaActual, totalAlimentos, activeMeal, onDelete, getCategoryIcon, getGlycemicClass }) {
  return (
    <section className="added-foods-section">
      <div className="section-header">
        <h3>ALIMENTOS AÑADIDOS</h3>
        <span className="badge-count">{totalAlimentos} alimentos</span>
      </div>

      <div className="foods-list">
        {listaActual.map((food) => (
          <div key={food.gramosId} className="food-item">
            <div className="food-icon-wrapper">{getCategoryIcon(food.categoria)}</div>
            <div className="food-details">
              <h4>{food.nombre}</h4>
              <p>{food.racion}g • 13:30</p>
            </div>
            <span className={`tag ${getGlycemicClass(food.impacto)}`}>{food.impacto}</span>
            <button className="delete-btn" onClick={() => onDelete(food.gramosId)} type="button">
              <FaTrash />
            </button>
          </div>
        ))}

        {totalAlimentos === 0 && (
          <p className="empty-list-message">No hay alimentos registrados en {activeMeal}.</p>
        )}
      </div>
    </section>
  );
}
