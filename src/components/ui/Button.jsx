export default function Button({ 
    children, 
    variant = "primary",
    type= "button",
    onClick,
    fullWidth = false,

}) { 
    const baseStyles = "px-4 py-2 rounded-x focus-semibold transition-all duration-200";

    const variants={
        primary: "bg-green-600 text-white hover:bg-blue-700",
        secondary: "border border-green-600 text-green-600 hover:bg-green-50",
        text: "text-green-600 hover: underline px-2 py-1",
    };
return (
    <button 
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${
            fullWidth ? "w-full" : ""} `}
    >
        {children}
    </button>
);
}