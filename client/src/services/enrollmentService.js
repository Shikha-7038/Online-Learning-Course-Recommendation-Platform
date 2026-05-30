import api from './api';

export const enrollmentService = {
  enrollInCourse: async (courseId) => {
    return api.post(`/enrollments/${courseId}`);
  },

  getMyEnrolledCourses: async () => {
    return api.get('/enrollments/my-courses');
  },

  checkEnrollment: async (courseId) => {
    return api.get(`/enrollments/check/${courseId}`);
  },

  updateEnrollmentStatus: async (courseId, status) => {
    return api.put(`/enrollments/${courseId}/status`, { status });
  },

  dropCourse: async (courseId) => {
    return api.delete(`/enrollments/${courseId}`);
  }
};