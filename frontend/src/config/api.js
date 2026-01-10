// frontend/src/config/api.js

const API_CONFIG = {
  // When backend is deployed on Render, update BACKEND_URL in Vercel env vars
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5999',
  
  // API endpoints
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    APPLY_LOAN: '/api/loan/apply-loan',
  },

  // Mock mode - set to false when backend is deployed
  USE_MOCK: import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK === true,
};

// Helper function to build full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
};

// Helper function to check if we should use mock data
export const shouldUseMock = () => {
  return API_CONFIG.USE_MOCK;
};

export default API_CONFIG;