import axios from "axios";

// --- Helpers para manejar el token -------------------------
export function saveToken(token) {
    localStorage.setItem("token", token);
}

export function removeToken() {
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

// --- Instancias principales -------------------------
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const apiUsers = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/users",
});

export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/auth",
});

// --- Interceptor GLOBAL para todas las instancias -------
const instances = [api, apiUsers, apiAuth];

instances.forEach((instance) => {
    // 🔵 Añadir token en cada request
    instance.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // 🔴 Manejar respuestas (ej: token expirado)
    instance.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err.response?.status === 401) {
                removeToken();
                window.location.href = "/login"; // redirigir
            }
            return Promise.reject(err);
        }
    );
});

export default api;
