import api from './api';

export const courseService = {
  getAllCourses: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/courses${queryParams ? `?${queryParams}` : ''}`);
  },

  getFeaturedCourses: async () => {
    return api.get('/courses/featured');
  },

  getCourseById: async (id) => {
    return api.get(`/courses/${id}`);
  },

  getCoursesByCategory: async (category, limit = 8) => {
    return api.get(`/courses/category/${encodeURIComponent(category)}?limit=${limit}`);
  },

  searchCourses: async (query) => {
    return api.get(`/courses/search/${encodeURIComponent(query)}`);
  },

  getCategories: async () => {
    return api.get('/courses/categories');
  }
};