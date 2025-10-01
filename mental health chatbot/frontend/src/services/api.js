import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const chatAPI = {
  sendMessage: async (message, sessionId) => {
    const response = await api.post(API_ENDPOINTS.CHAT, {
      message,
      session_id: sessionId
    });
    return response.data;
  },

  clearHistory: async (sessionId) => {
    const response = await api.post(API_ENDPOINTS.CLEAR_HISTORY, {
      session_id: sessionId
    });
    return response.data;
  },

  getResources: async () => {
    const response = await api.get(API_ENDPOINTS.RESOURCES);
    return response.data;
  },

  healthCheck: async () => {
    const response = await api.get(API_ENDPOINTS.HEALTH);
    return response.data;
  },

  search: async (query, k = 3) => {
    const response = await api.post(API_ENDPOINTS.SEARCH, {
      query,
      k
    });
    return response.data;
  },

  submitFeedback: async (rating, comment, sessionId) => {
    const response = await api.post(API_ENDPOINTS.FEEDBACK, {
      rating,
      comment,
      session_id: sessionId
    });
    return response.data;
  }
};

export default api;