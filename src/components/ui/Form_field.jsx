import Input from "./Input";

export default function FormField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  helper,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`form-field ${className}`}>
      
      {/* Label */}
      {label && <label className="form-label">{label}</label>}

      {/* Input */}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
      />

      {/* Helper */}
      {helper && !error && (
        <span className="form-helper">{helper}</span>
      )}

      {/* Error */}
      {error && (
        <span className="form-error">{error}</span>
      )}
    </div>
  );
}
