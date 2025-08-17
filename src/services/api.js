import axios from 'axios';

const api = axios.create({
  baseURL: 'https://militaryassetmanagement-system-backend.onrender.com/api',
});

// const BASE = 'https://military-a432.onrender.com'; 



// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
