import axios from "axios";

// Instancia centralizada para el servicio de usuarios
const apiUsuario = axios.create({
  baseURL: "http://127.0.0.1:8000/usuario",
  headers: {
    "Content-Type": "application/json",
  },
});

// Crear un usuario
export const crearUsuario = async (payload) => {
  try {
    const res = await apiUsuario.post("/", payload);
    return res.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Ver un solo usuario
export const obtenerUsuario = async (id) => {
  try {
    const res = await apiUsuario.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el usuario ${id}:`, error);
    throw error;
  }
};

// Editar un usuario
export const actualizarUsuario = async (id, payload) => {
  try {
    const res = await apiUsuario.put(`/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario ${id}:`, error);
    throw error;
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
  try {
    await apiUsuario.delete(`/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el usuario ${id}:`, error);
    throw error;
  }
};
