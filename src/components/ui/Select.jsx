export default function Select({
  label,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Select */}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-xl border outline-none
          text-gray-800 bg-white
          transition-all duration-200
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "focus:border-green-600"}
        `}
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
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

