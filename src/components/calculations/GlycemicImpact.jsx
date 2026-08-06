import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import "./../../styles/GlycemicImpact.css"; // 🌟 Importamos la nueva hoja de estilos CSS separada

export default function ImpactoGlucemicoComida({ alimentos }) {
  // Si la lista está vacía o no hay alimentos en ese momento del día, no pintamos nada
  if (!alimentos || alimentos.length === 0) return null;

  // 1. Lógica de negocio visual: Buscamos si existe algún alimento con impacto Alto o Medio en el plato
  let impactoFinal = "Bajo";
  const tieneAlto = alimentos.some(al => al.impacto === "Alto");
  const tieneMedio = alimentos.some(al => al.impacto === "Medio");

  if (tieneAlto) {
    impactoFinal = "Alto";
  } else if (tieneMedio) {
    impactoFinal = "Medio";
  }

  // 2. Mapeamos la configuración de textos e iconos según las clases del archivo CSS
  let config = {
    nivelTexto: "Bajo",
    claseModificadora: "impacto-glucemico-badge--bajo",
    icono: <FaCheckCircle className="impacto-glucemico-icon impacto-glucemico-icon--bajo" />,
    mensaje: "¡Excelente combinación! Esta comida mantendrá tus niveles de energía estables y sin picos de azúcar."
  };

  if (impactoFinal === "Medio") {
    config = {
      nivelTexto: "Moderado",
      claseModificadora: "impacto-glucemico-badge--medio",
      icono: <FaInfoCircle className="impacto-glucemico-icon impacto-glucemico-icon--medio" />,
      mensaje: "Impacto moderado. Una combinación equilibrada, ideal para el día a día."
    };
  } else if (impactoFinal === "Alto") {
    config = {
      nivelTexto: "Alto",
      claseModificadora: "impacto-glucemico-badge--alto",
      icono: <FaExclamationTriangle className="impacto-glucemico-icon impacto-glucemico-icon--alto" />,
      mensaje: "Impacto elevado. Esta combinación puede generar picos rápidos de insulina. Considera balancearla con fibra o proteína."
    };
  }

  return (
    <div className="impacto-glucemico-card">
      <span className="impacto-glucemico-card__subtitle">
        Impacto Glucémico de la Comida
      </span>

      {/* Aplicamos la clase base y le inyectamos el modificador dinámico del CSS */}
      <div className={`impacto-glucemico-badge ${config.claseModificadora}`}>
        {config.icono}
        <div className="impacto-glucemico-badge__text-group">
          <span className="impacto-glucemico-badge__label">NIVEL ESTIMADO</span>
          <strong className="impacto-glucemico-badge__result">{config.nivelTexto}</strong>
        </div>
      </div>

      <p className="impacto-card__description">
        {config.mensaje}
      </p>
    </div>
  );
}

