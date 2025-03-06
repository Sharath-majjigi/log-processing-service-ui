import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
    return localStorage.getItem('access_token');
};

const getTokenExpiry = () => {
    return localStorage.getItem('tokenExpiration');
}

const apiClient = axios.create({
    baseURL: API_URL,
});


apiClient.interceptors.request.use((config) => {
    const token = getToken();
    const tokenExpiry = getTokenExpiry();

    if (token && tokenExpiry) {
        const isExpired = Date.now() >= tokenExpiry;

        if (isExpired) {
            logout();
            throw new Error('Please login to access the application.');
        }

        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export const signup = async (email, password) => {
    const response = await apiClient.post('/signup', { email, password });
    return response.data;
};


export const login = async (email, password) => {
    const response = await apiClient.post('/login', { email, password });
    
    const token = response.data.session.access_token; 
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; 

    localStorage.setItem('access_token', token);
    localStorage.setItem('tokenExpiration', expirationTime);
    return response.data;
};

export const getQueueStatus = async () => {
    const response = await apiClient.get('/queue-status');
    return response.data;
};

export const fetchStats = async () => {
    const response = await apiClient.get('/stats'); 
    return response.data;
};


export const getStatsByJobId = async (jobId) => {
    const response = await apiClient.get(`/stats?jobId=${jobId}`); 
    return response.data;
};


export const uploadFile = async (formData, onUploadProgress) => {
    const response = await apiClient.post('/upload', formData, {
        onUploadProgress,
    });
    return response.data; 
};


const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    window.location.href = '/login'; 
};