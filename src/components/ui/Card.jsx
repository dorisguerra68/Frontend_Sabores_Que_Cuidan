export default function Card({
  children,
  title,
  description,
  icon,
  variant = "default",
  onClick,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`card card-${variant} ${className}`}
    >
      {icon && <div className="card-icon">{icon}</div>}

      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>
    </div>
  );
}
