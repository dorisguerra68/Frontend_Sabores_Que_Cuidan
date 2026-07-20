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
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/*etiqueta de formulario*/}
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input */}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
      />

      {/* Texto de ayuda */}
      {helper && !error && (
        <span className="text-xs text-gray-500">{helper}</span>
      )}

      {/* Error  */}
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

