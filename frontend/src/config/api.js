// frontend/src/config/api.js

const API_CONFIG = {
  // Backend URL - update this in environment variables when deploying
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5999',
  
  // API endpoints
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    APPLY_LOAN: '/api/loan/apply-loan',
  },
};

// Helper function to build full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};

export default API_CONFIG;