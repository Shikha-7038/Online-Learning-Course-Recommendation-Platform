// controllers/recommendation.controller.js - Recommendation logic

const Course = require('../models/Course.model');
const Enrollment = require('../models/Enrollment.model');
const User = require('../models/User.model');
const recommendationEngine = require('../utils/recommendationEngine');

// @desc    Get personalized course recommendations for user
// @route   GET /api/recommendations
// @access  Private
exports.getPersonalizedRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit = 10 } = req.query;

        // Get user with their interests and skills
        const user = await User.findById(userId);
        
        // Get enrolled course IDs to exclude
        const enrollments = await Enrollment.find({ 
            user: userId, 
            status: { $in: ['active', 'completed'] }
        });
        const enrolledCourseIds = enrollments.map(e => e.course.toString());

        // Get recommendations based on user interests and skills
        let recommendations = await recommendationEngine.getUserBasedRecommendations(
            user,
            parseInt(limit) * 2 // Get extra to account for filtering
        );

        // Filter out already enrolled courses
        recommendations = recommendations.filter(
            course => !enrolledCourseIds.includes(course._id.toString())
        );

        // Limit to requested number
        recommendations = recommendations.slice(0, parseInt(limit));

        res.json({
            success: true,
            recommendations,
            count: recommendations.length
        });

    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recommendations'
        });
    }
};

// @desc    Get similar courses to a given course
// @route   GET /api/recommendations/similar/:courseId
// @access  Public
exports.getSimilarCourses = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { limit = 6 } = req.query;

        const sourceCourse = await Course.findById(courseId);
        
        if (!sourceCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const similarCourses = await recommendationEngine.getSimilarCourses(
            sourceCourse,
            parseInt(limit)
        );

        res.json({
            success: true,
            sourceCourse: {
                _id: sourceCourse._id,
                title: sourceCourse.title
            },
            similarCourses,
            count: similarCourses.length
        });

    } catch (error) {
        console.error('Get similar courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching similar courses'
        });
    }
};

// @desc    Get popular courses
// @route   GET /api/recommendations/popular
// @access  Public
exports.getPopularCourses = async (req, res) => {
    try {
        const { limit = 8 } = req.query;

        const popularCourses = await Course.find({ isPublished: true })
            .sort({ totalEnrollments: -1, rating: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            courses: popularCourses,
            count: popularCourses.length
        });

    } catch (error) {
        console.error('Get popular courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching popular courses'
        });
    }
};

// @desc    Get trending courses (recently popular)
// @route   GET /api/recommendations/trending
// @access  Public
exports.getTrendingCourses = async (req, res) => {
    try {
        const { limit = 8 } = req.query;

        // Courses that have been updated recently and have good enrollment
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const trendingCourses = await Course.find({ 
            isPublished: true,
            lastUpdated: { $gte: thirtyDaysAgo }
        })
        .sort({ totalEnrollments: -1, rating: -1 })
        .limit(parseInt(limit));

        // If not enough trending courses, add popular ones
        if (trendingCourses.length < parseInt(limit)) {
            const popularCourses = await Course.find({ isPublished: true })
                .sort({ totalEnrollments: -1, rating: -1 })
                .limit(parseInt(limit) - trendingCourses.length);
            
            trendingCourses.push(...popularCourses);
        }

        res.json({
            success: true,
            courses: trendingCourses,
            count: trendingCourses.length
        });

    } catch (error) {
        console.error('Get trending courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching trending courses'
        });
    }
};

// @desc    Get skill gap recommendations based on user's interests and goals
// @route   GET /api/recommendations/skill-gap
// @access  Private
exports.getSkillGapRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit = 8 } = req.query;

        const user = await User.findById(userId);
        
        // Get enrolled courses to know what skills user is already learning
        const enrollments = await Enrollment.find({ 
            user: userId, 
            status: { $in: ['active', 'completed'] }
        }).populate('course');
        
        const enrolledCourseIds = enrollments.map(e => e.course._id.toString());
        
        // Get skills from enrolled courses
        const enrolledSkills = new Set();
        enrollments.forEach(e => {
            e.course.skillsTaught?.forEach(skill => enrolledSkills.add(skill));
        });

        // Get recommendations based on skill gap
        let recommendations = await recommendationEngine.getSkillGapRecommendations(
            user,
            Array.from(enrolledSkills),
            parseInt(limit) * 2
        );

        // Filter out enrolled courses
        recommendations = recommendations.filter(
            course => !enrolledCourseIds.includes(course._id.toString())
        );

        // Limit results
        recommendations = recommendations.slice(0, parseInt(limit));

        res.json({
            success: true,
            recommendations,
            count: recommendations.length
        });

    } catch (error) {
        console.error('Get skill gap recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching skill gap recommendations'
        });
    }
};