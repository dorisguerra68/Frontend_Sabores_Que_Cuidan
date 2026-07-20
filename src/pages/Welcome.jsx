import React from 'react';
import Logo from '../assets/image/logo1.png';
import Heroimg from '../assets/image/comer1.png';

export default function Welcome() {
  return (
    // bg-sqc-cream aplica tu color #ecc787 como fondo de la página
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12 lg:p-20 bg-sqc-cream font-sqc">
      
      {/* BLOQUE IZQUIERDO: Conjunto de texto y botones alineado a la izquierda */}
      <div className="flex flex-col items-start text-left w-full md:w-1/2 max-w-xl order-2 md:order-1">
        
        {/* 1. LOGO: Posicionado en la parte superior del título */}
        <div className="mb-10 flex items-center gap-3">
          <img 
            src={Logo} 
            alt="Logo Sabores Que Cuidan" 
            className="h-12 w-auto object-contain" 
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-wide text-sqc-dark uppercase">
              Sabores que Cuidan
            </h2>
            <p className="text-[10px] text-sqc-dark/70 tracking-wider">
              Salud · Nutrición · Bienestar
            </p>
          </div>
        </div>

        {/* 2. TÍTULO */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sqc-dark leading-tight mb-6">
          Comer sano no es <br /> dejar de disfrutar
        </h1>

        {/* 3. SUBTÍTULO: Justo debajo del título */}
        <p className="text-base sm:text-lg text-sqc-dark/80 mb-10 max-w-md leading-relaxed">
          Registra tus comidas, estima tu respuesta insulínica y recibe recomendaciones personalizadas basadas en tu perfil de salud.
        </p>

        {/* 4. BOTONES: Debajo del subtítulo, en columna (apilados verticalmente) */}
        <div className="flex flex-col gap-4 w-full max-w-xs mb-6">
          {/* Botón Crear Cuenta (Verde principal #185a4a) */}
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sqc-green text-white font-medium rounded-2xl hover:opacity-90 active:scale-[0.99] transition-all shadow-sm">
            <span>Crear cuenta</span>
            <span className="text-lg">→</span>
          </button>
          
          {/* Botón Iniciar Sesión (Borde con el verde principal) */}
          <button className="w-full px-6 py-4 border-2 border-sqc-green text-sqc-green font-medium rounded-2xl hover:bg-sqc-green/5 active:scale-[0.99] transition-all">
            Iniciar sesión
          </button>
        </div>

        {/* Enlace de información adicional */}
        <a href="#" className="text-xs font-medium text-sqc-dark/70 underline underline-offset-4 hover:text-sqc-dark transition-colors ml-1">
          Más información sobre la app
        </a>
      </div>

      {/* BLOQUE DERECHO: Imagen en el centro derecho de la página */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0">
        {/* Contenedor estético blanco translúcido de fondo para enmarcar la foto */}
        <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5] rounded-[2.5rem] p-3 bg-white/30 shadow-sm border border-white/20 overflow-hidden">
          <img 
            src={Heroimg} 
            alt="Personas disfrutando de una comida saludable" 
            className="w-full h-full object-cover rounded-[2rem]"
          />
        </div>
      </div>

    </div>
  );
}
