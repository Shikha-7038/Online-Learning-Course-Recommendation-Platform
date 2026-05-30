// routes/enrollment.routes.js - Enrollment routes

const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   POST /api/enrollments/:courseId
// @desc    Enroll in a course
// @access  Private
router.post('/:courseId', protect, enrollmentController.enrollInCourse);

// @route   GET /api/enrollments/my-courses
// @desc    Get all enrolled courses for current user
// @access  Private
router.get('/my-courses', protect, enrollmentController.getMyEnrolledCourses);

// @route   GET /api/enrollments/check/:courseId
// @desc    Check if user is enrolled in a course
// @access  Private
router.get('/check/:courseId', protect, enrollmentController.checkEnrollment);

// @route   PUT /api/enrollments/:courseId/status
// @desc    Update enrollment status
// @access  Private
router.put('/:courseId/status', protect, enrollmentController.updateEnrollmentStatus);

// @route   DELETE /api/enrollments/:courseId
// @desc    Drop a course
// @access  Private
router.delete('/:courseId', protect, enrollmentController.dropCourse);

module.exports = router;