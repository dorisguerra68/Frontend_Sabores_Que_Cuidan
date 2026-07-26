import React from "react";

export function GlycemicDashboard({ activeMeal, totalAlimentos, bajoCount, medioCount, altoCount, pctBajo, pctMedio, pctAlto }) {
  return (
    <section className="glycemic-dashboard">
      <div className="dashboard-header">
        <h3>NIVEL GLUCÉMICO · {activeMeal.toUpperCase()}</h3>
        <span className="badge-count">{totalAlimentos} alimentos</span>
      </div>

      <div className="horizontal-bar-chart">
        <div className="chart-segment low" style={{ width: `${pctBajo}%` }} />
        <div className="chart-segment medium" style={{ width: `${pctMedio}%` }} />
        <div className="chart-segment high" style={{ width: `${pctAlto}%` }} />
      </div>

      <div className="chart-legend">
        <span className="legend-item">
          <span className="dot low" /> Bajo {pctBajo}%
        </span>
        <span className="legend-item">
          <span className="dot medium" /> Medio {pctMedio}%
        </span>
        <span className="legend-item">
          <span className="dot high" /> Alto {pctAlto}%
        </span>
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
  );
}
