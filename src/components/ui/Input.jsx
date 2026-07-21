export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`input-field ${className}`}>
      
      {label && <label className="input-label">{label}</label>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input ${error ? "input-error" : ""} ${disabled ? "input-disabled" : ""}`}
      />

      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}
