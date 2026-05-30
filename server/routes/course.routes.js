// routes/course.routes.js - Course routes

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/courses
// @desc    Get all courses with filtering
// @access  Public
router.get('/', courseController.getAllCourses);

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get('/featured', courseController.getFeaturedCourses);

// @route   GET /api/courses/categories
// @desc    Get all course categories
// @access  Public
router.get('/categories', courseController.getCategories);

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get('/:id', courseController.getCourseById);

// @route   GET /api/courses/category/:category
// @desc    Get courses by category
// @access  Public
router.get('/category/:category', courseController.getCoursesByCategory);

// @route   GET /api/courses/search/:query
// @desc    Search courses
// @access  Public
router.get('/search/:query', courseController.searchCourses);

// @route   POST /api/courses
// @desc    Create a new course (for admin/instructor)
// @access  Private/Admin
router.post('/', protect, courseController.createCourse);

// @route   PUT /api/courses/:id
// @desc    Update course (for admin/instructor)
// @access  Private/Admin
router.put('/:id', protect, courseController.updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete course (for admin/instructor)
// @access  Private/Admin
router.delete('/:id', protect, courseController.deleteCourse);

module.exports = router;