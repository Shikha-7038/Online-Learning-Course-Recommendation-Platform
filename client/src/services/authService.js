import api from './api';

export const authService = {
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  getCurrentUser: async () => {
    return api.get('/auth/me');
  },

  updateProfile: async (profileData) => {
    return api.put('/auth/update-profile', profileData);
  },

  logout: async () => {
    return api.post('/auth/logout');
  }
};