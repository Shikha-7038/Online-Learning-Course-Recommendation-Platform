import api from './api';

export const progressService = {
  getMyProgress: async () => {
    return api.get('/progress/my-progress');
  },

  getCourseProgress: async (courseId) => {
    return api.get(`/progress/${courseId}`);
  },

  initProgress: async (courseId) => {
    return api.post(`/progress/init/${courseId}`);
  },

  updateLessonProgress: async (courseId, lessonId, data) => {
    return api.put(`/progress/${courseId}/lesson/${lessonId}`, data);
  },

  completeLesson: async (courseId, lessonId) => {
    return api.post(`/progress/${courseId}/complete-lesson/${lessonId}`);
  },

  getProgressOverview: async (courseId) => {
    return api.get(`/progress/${courseId}/overview`);
  }
};