import axios from 'axios';

export const axiosInstance = axios.create({
  timeout: 1000,
});

// Update configs, interceptor here, just leave it as a basis version here
