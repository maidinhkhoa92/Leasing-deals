import axios from 'axios';
import { APP_CONFIG } from 'configs';
const request = axios.create({
  baseURL: APP_CONFIG.baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// before send request
request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return error;
  }
);

// after send request
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const response = JSON.parse(JSON.stringify(error));
    return response.response;
  }
);

export default request;
