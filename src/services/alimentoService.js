import axios from "axios";

// Creamos una instancia centralizada de Axios
const apiAlimentos = axios.create({
  baseURL: "http://localhost:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});


// Ver la lista de alimentos
export const listaAlimentos = async () => {
  try {
    const res = await apiAlimentos.get("/");
    return res.data;
  } catch (error) {
    console.error("Error al listar alimentos:", error);
    throw error;
  }
};

// Ver un solo alimento
export const obtenerAlimento = async (id) => {
  try {
    const res = await apiAlimentos.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el alimento ${id}:`, error);
    throw error;
  }
};

// Crear un alimento
export const crearAlimento = async (payload) => {
  try {
    const res = await apiAlimentos.post("/", payload);
    return res.data;
  } catch (error) {
    console.error("Error al crear alimento:", error);
    throw error;
  }
};

// Editar un alimento
export const actualizarAlimento = async (id, payload) => {
  try {
    const res = await apiAlimentos.put(`/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar el alimento ${id}:`, error);
    throw error;
  }
};

// Eliminar un alimento
export const eliminarAlimento = async (id) => {
  try {
    await apiAlimentos.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el alimento ${id}:`, error);
    throw error;
  }
};

// Buscar un alimento
// Buscar un alimento (Alineado con tu Swagger real)
export const buscarAlimento = async (termino) => {
  try {
    // Apuntamos directamente a la ruta raíz que viste en Swagger: /alimento/
    // Y le pasamos el término de búsqueda de forma asíncrona como un parámetro limpio (?buscar=pan)
    const res = await apiAlimentos.get("/alimento/", {
      params: { buscar: termino } 
    });
    return res.data;
  } catch (error) {
    console.error(`Error al buscar alimento con término "${termino}":`, error);
    throw error;
  }
};

