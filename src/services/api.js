// ...existing code...
import axios from 'axios';

const baseURL = 'https://militaryassetmanagement-system-backend.onrender.com/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));

export default api;