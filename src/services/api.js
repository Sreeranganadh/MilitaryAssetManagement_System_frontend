import axios from 'axios';

const api = axios.create({
  baseURL: 'https://militaryassetmanagement-system-backend.onrender.com/api' || 'http://localhost:5000/api',
});

// const BASE = 'https://military-a432.onrender.com'; 

// const api = axios.create({
//    baseURL: BASE ? `${BASE}/api` : '/api',
//   withCredentials: true
// })


// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
