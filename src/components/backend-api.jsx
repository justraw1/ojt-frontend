import axios from "axios"

const backend_api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
});

backend_api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export function setAuthToken(token) {
    if(token) {
        backend_api.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
    } else {
        delete backend_api.defaults.headers.common['Authorization'];
    }
}

export default backend_api;