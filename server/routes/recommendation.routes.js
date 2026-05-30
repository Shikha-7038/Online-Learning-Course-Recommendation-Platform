// routes/recommendation.routes.js - Recommendation routes

const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/recommendations
// @desc    Get personalized course recommendations for user
// @access  Private
router.get('/', protect, recommendationController.getPersonalizedRecommendations);

// @route   GET /api/recommendations/similar/:courseId
// @desc    Get similar courses to a given course
// @access  Public
router.get('/similar/:courseId', recommendationController.getSimilarCourses);

// @route   GET /api/recommendations/popular
// @desc    Get popular courses
// @access  Public
router.get('/popular', recommendationController.getPopularCourses);

// @route   GET /api/recommendations/skill-gap
// @desc    Get courses to fill skill gaps based on user's interests and goals
// @access  Private
router.get('/skill-gap', protect, recommendationController.getSkillGapRecommendations);

// @route   GET /api/recommendations/trending
// @desc    Get trending courses
// @access  Public
router.get('/trending', recommendationController.getTrendingCourses);

module.exports = router;