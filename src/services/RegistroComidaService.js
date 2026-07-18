import axios from "axios";

//nombre exacto en el router de registro de comida como está escrito el router de la API en prefix//
const API_URL = "http://127.0.0.1:8000/registro_comida";

// veremos la listas de los registros de comida//
export const listaRegistroComida = async () => {
    const res = await axios.get(API_URL + "/");
    return res.data;
};

// ver un solo registro de comida//
export const obtenerRegistroComida = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

// crear un registro de comida//
export const crearRegistroComida = async (payload) => {
    const res = await axios.post(API_URL + "/", payload);
    return res.data;
}

// editar un registro de comida//
export const actualizarRegistroComida = async (id, payload) => {
    const res = await axios.put(`${API_URL}/${id}`, payload);
    return res.data;
};

// eliminar un registro de comida//
export const eliminarRegistroComida = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

/* buscar un registro de comida por fecha
export const buscarRegistroComida = async (datetime) => {   
    const res = await axios.get(API_URL + "/buscar/" + datetime);
    return res.data;
}*/



