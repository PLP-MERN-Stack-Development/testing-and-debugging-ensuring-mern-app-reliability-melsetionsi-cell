import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const fetchBugs = () => API.get('/bugs');
export const createBug = (data: any) => API.post('/bugs', data);
export const updateBug = (id: string, data: any) => API.put(`/bugs/${id}`, data);
export const deleteBug = (id: string) => API.delete(`/bugs/${id}`);