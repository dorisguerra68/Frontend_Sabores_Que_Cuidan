export default function Card({
  children,
  title,
  description,
  icon,
  variant = "default",
  onClick,
}) {
  const baseStyles =
    "rounded-xl p-4 flex gap-4 transition-all duration-200";

  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    soft: "bg-gray-50 border border-gray-200",
    clickable:
      "bg-white border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5",
    clean: "bg-transparent border-none shadow-none",
  };

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {icon && (
        <div className="text-green-600 text-3xl flex-shrink-0">
          {icon}
        </div>
      )}

      <div className="flex flex-col">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}

        {children}
      </div>
    </div>
  );
}
