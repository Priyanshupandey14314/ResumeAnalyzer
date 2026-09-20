import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token dynamically from localStorage before every request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('rm_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Standardize API error formatting
const formatApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    if (status === 401 || status === 403) {
      return new Error(data?.message || 'Authentication required. Please log in.');
    }
    if (status === 400) {
      return new Error(data?.message || 'Invalid request parameters or file payload.');
    }
    if (status === 500) {
      return new Error('Server error occurred while analyzing the resume. Please try again.');
    }
    return new Error(data?.message || `Server responded with status ${status}`);
  } else if (error.request) {
    return new Error('Unable to connect to the backend server. Please check if Spring Boot is running.');
  }
  return error;
};

// API Services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      return response.data; // { token, name, email }
    } catch (err) {
      throw formatApiError(err);
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      return response.data; // { token, name, email }
    } catch (err) {
      throw formatApiError(err);
    }
  },
};

export const analysisService = {
  analyzeResume: async (resumeFile, jobDescription) => {
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);

      const response = await api.post('/api/analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Analysis entity { id, restext, jobDescription, matchScore, mskills, suggestions, createdAt }
    } catch (err) {
      throw formatApiError(err);
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get('/api/analysis/history');
      return response.data; // List<Analysis>
    } catch (err) {
      throw formatApiError(err);
    }
  },
};

export default api;
