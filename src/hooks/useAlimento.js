import { useState } from 'react';
import { buscarAlimento } from '../services/alimentoService'; // 👈 Asegúrate de que la ruta a tu archivo service sea la correcta

export function useAlimentos() {
  const [alimentos, setAlimentos] = useState([]); 
  const [cargando, setCargando] = useState(false); 
  const [error, setError] = useState(null);       

  const buscarAlimentos = async (termino) => {
    if (!termino.trim()) {
      setAlimentos([]);
      return;
    }

    setCargando(true);
    setError(null);

    try {
      // 👈 Usamos tu función del service que ya hace la ruta limpia /buscar/{termino}
      const datos = await buscarAlimento(termino);
      setAlimentos(datos); 
    } catch (err) {
      setError(err.message || "Error al buscar el alimento"); 
    } finally {
      setCargando(false); 
    }
  };

  return { alimentos, cargando, error, buscarAlimentos, setAlimentos };
}

