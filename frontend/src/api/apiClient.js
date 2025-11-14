import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Your Node.js backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;