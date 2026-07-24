import axios from "axios";

// Instancia centralizada para el registro de comidas
const apiRegistroComida = axios.create({
  baseURL: "http://localhost:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Ver la lista de los registros de comida (Apunta a: http://localhost:8000/registro_comida/)
export const listaRegistroComida = async () => {
  try {
    const res = await apiRegistroComida.get("/registro_comida/");
    return res.data;
  } catch (error) {
    console.error("Error al listar registros de comida:", error);
    throw error;
  }
};

// Ver un solo registro de comida (Apunta a: http://localhost:8000/registro_comida/5)
export const obtenerRegistroComida = async (id) => {
  try {
    const res = await apiRegistroComida.get(`/registro_comida/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el registro de comida ${id}:`, error);
    throw error;
  }
};

// 🌟 CORREGIDO: Crear un registro de comida (Apunta exactamente a: http://localhost:8000/registro_comida/)
export const crearRegistroComida = async (payload) => {
  try {
    // Agregamos el prefijo con la barra al final como exige tu Swagger
    const res = await apiRegistroComida.post("/registro_comida/", payload);
    return res.data;
  } catch (error) {
    console.error("Error al crear registro de comida:", error);
    throw error;
  }
};

// Editar un registro de comida (Apunta a: http://localhost:8000/registro_comida/5)
export const actualizarRegistroComida = async (id, payload) => {
  try {
    const res = await apiRegistroComida.put(`/registro_comida/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar el registro de comida ${id}:`, error);
    throw error;
  }
};

// Eliminar un registro de comida (Apunta a: http://localhost:8000/registro_comida/5)
export const eliminarRegistroComida = async (id) => {
  try {
    await apiRegistroComida.delete(`/registro_comida/${id}`);
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
