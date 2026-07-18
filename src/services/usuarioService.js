import axios from "axios";

const API_URL = "http://127.0.0.1:8000/usuario";

// crear un usario //
export const crearUsuario = async (payload) => {
    const res = await axios.post(API_URL + "/", payload);
    return res.data;    
};

// ver un solo usuario//
export const obtenerUsuario = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

// editar un usuario//
export const actualizarUsuario = async (id, payload) => {
    const res = await axios.put(`${API_URL}/${id}`, payload);
    return res.data;
};

// eliminar un usuario//
export const eliminarUsuario = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
