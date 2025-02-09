import axios from 'axios';

// Setting up the base URL for your API requests (adjust according to your API)
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;