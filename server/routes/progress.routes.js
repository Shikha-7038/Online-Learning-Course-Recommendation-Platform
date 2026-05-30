// routes/progress.routes.js - Progress tracking routes with fix endpoint

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/progress/my-progress
// @desc    Get all progress for current user
// @access  Private
router.get('/my-progress', protect, progressController.getMyProgress);

// @route   GET /api/progress/:courseId
// @desc    Get progress for a specific course
// @access  Private
router.get('/:courseId', protect, progressController.getCourseProgress);

// @route   POST /api/progress/init/:courseId
// @desc    Initialize progress for a course
// @access  Private
router.post('/init/:courseId', protect, progressController.initProgress);

// @route   POST /api/progress/fix/:courseId
// @desc    Fix progress for existing enrollment (NEW)
// @access  Private
router.post('/fix/:courseId', protect, progressController.fixProgress);

// @route   PUT /api/progress/:courseId/lesson/:lessonId
// @desc    Update lesson progress
// @access  Private
router.put('/:courseId/lesson/:lessonId', protect, progressController.updateLessonProgress);

// @route   POST /api/progress/:courseId/complete-lesson/:lessonId
// @desc    Mark a lesson as complete
// @access  Private
router.post('/:courseId/complete-lesson/:lessonId', protect, progressController.completeLesson);

// @route   GET /api/progress/:courseId/overview
// @desc    Get progress overview for a course
// @access  Private
router.get('/:courseId/overview', protect, progressController.getProgressOverview);

module.exports = router;