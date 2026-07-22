export default function Select({
  label,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`select-field ${className}`}>
      
      {/* Label */}
      {label && <label className="select-label">{label}</label>}

      {/* Select */}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`select ${error ? "select-error" : ""} ${disabled ? "select-disabled" : ""}`}
      >
        <option value="" disabled>
          Selecciona una opción
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Error */}
      {error && <span className="select-error-text">{error}</span>}
    </div>
  );
}
