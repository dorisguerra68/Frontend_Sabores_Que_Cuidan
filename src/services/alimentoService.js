import axios from "axios";

const API_URL = "http://127.0.0.1:8000/alimento";


// veremos la lista de alimento//
export const listaAlimentos = async () => {
    const res = await axios.get(API_URL + "/");
    return res.data;
};

// ver un solo alimento//
export const obtenerAlimento = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

// crear un alimento//
export const crearAlimento = async (payload) => {
    const res = await axios.post(API_URL + "/", payload);
    return res.data;
};

// editar un alimento//
export const actualizarAlimento = async (id, payload) => {
    const res = await axios.put(`${API_URL}/${id}`, payload);
    return res.data;
};

// eliminar un alimento//
export const eliminarAlimento = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// buscar un alimento//
export const buscarAlimento = async (termino) => {
    const res = await axios.get(API_URL + "/buscar/" + termino);
    return res.data;
};


