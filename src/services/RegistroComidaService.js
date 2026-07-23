import axios from "axios";

// Instancia centralizada para el registro de comidas
const apiRegistroComida = axios.create({
  baseURL: "http://127.0.0.1:8000/registro_comida",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ver la lista de los registros de comida
export const listaRegistroComida = async () => {
  try {
    const res = await apiRegistroComida.get("/");
    return res.data;
  } catch (error) {
    console.error("Error al listar registros de comida:", error);
    throw error;
  }
};

// Ver un solo registro de comida
export const obtenerRegistroComida = async (id) => {
  try {
    const res = await apiRegistroComida.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el registro de comida ${id}:`, error);
    throw error;
  }
};

// Crear un registro de comida
export const crearRegistroComida = async (payload) => {
  try {
    const res = await apiRegistroComida.post("/", payload);
    return res.data;
  } catch (error) {
    console.error("Error al crear registro de comida:", error);
    throw error;
  }
};

// Editar un registro de comida
export const actualizarRegistroComida = async (id, payload) => {
  try {
    const res = await apiRegistroComida.put(`/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar el registro de comida ${id}:`, error);
    throw error;
  }
};

// Eliminar un registro de comida
export const eliminarRegistroComida = async (id) => {
  try {
    await apiRegistroComida.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el registro de comida ${id}:`, error);
    throw error;
  }
};

// Buscar un registro de comida por fecha (Descoméntalo si tu backend ya acepta la ruta)
/*
export const buscarRegistroComida = async (datetime) => {   
  try {
    // encodeURIComponent protege caracteres especiales como espacios o zonas horarias en la URL
    const res = await apiRegistroComida.get(`/buscar/${encodeURIComponent(datetime)}`);
    return res.data;
  } catch (error) {
    console.error(`Error al buscar registro de comida para la fecha ${datetime}:`, error);
    throw error;
  }
};
*/
