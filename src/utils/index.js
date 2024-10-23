// utils/apiBase.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8002/api';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    // Do something before sending the request, e.g., add auth token
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);
export default instance;