// controllers/course.controller.js - Course management logic

const Course = require('../models/Course.model');

// @desc    Get all courses with filtering
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
    try {
        const { 
            category, 
            level, 
            search, 
            sort = 'createdAt',
            page = 1, 
            limit = 12 
        } = req.query;

        // Build query
        let query = { isPublished: true };

        if (category) {
            query.category = category;
        }

        if (level) {
            query.level = level;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Sort options
        let sortOption = {};
        switch (sort) {
            case 'popular':
                sortOption = { totalEnrollments: -1 };
                break;
            case 'rating':
                sortOption = { rating: -1 };
                break;
            case 'newest':
                sortOption = { createdAt: -1 };
                break;
            case 'price-low':
                sortOption = { price: 1 };
                break;
            case 'price-high':
                sortOption = { price: -1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }

        const courses = await Course.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Course.countDocuments(query);

        res.json({
            success: true,
            courses,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalCourses: total,
                hasMore: skip + courses.length < total
            }
        });

    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching courses'
        });
    }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
exports.getFeaturedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true, featured: true })
            .limit(6)
            .sort({ rating: -1 });

        res.json({
            success: true,
            courses
        });

    } catch (error) {
        console.error('Get featured courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching featured courses'
        });
    }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            course
        });

    } catch (error) {
        console.error('Get course by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching course'
        });
    }
};

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
// @access  Public
exports.getCoursesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 8 } = req.query;

        const courses = await Course.find({ 
            isPublished: true, 
            category: decodeURIComponent(category) 
        })
        .limit(parseInt(limit))
        .sort({ rating: -1 });

        res.json({
            success: true,
            courses
        });

    } catch (error) {
        console.error('Get courses by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching courses by category'
        });
    }
};

// @desc    Get all categories
// @route   GET /api/courses/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = [
            'Web Development',
            'Data Science',
            'AI/ML',
            'Cybersecurity',
            'Cloud Computing',
            'DevOps',
            'Mobile Development',
            'Game Development',
            'Database',
            'Blockchain',
            'UI/UX Design',
            'Digital Marketing'
        ];

        res.json({
            success: true,
            categories
        });

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching categories'
        });
    }
};

// @desc    Search courses
// @route   GET /api/courses/search/:query
// @access  Public
exports.searchCourses = async (req, res) => {
    try {
        const { query } = req.params;
        
        const courses = await Course.find({
            isPublished: true,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } },
                { skillsTaught: { $in: [new RegExp(query, 'i')] } }
            ]
        }).limit(20);

        res.json({
            success: true,
            courses
        });

    } catch (error) {
        console.error('Search courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while searching courses'
        });
    }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res) => {
    try {
        const courseData = req.body;
        
        const course = await Course.create(courseData);

        res.status(201).json({
            success: true,
            course
        });

    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating course'
        });
    }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            course
        });

    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating course'
        });
    }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            message: 'Course deleted successfully'
        });

    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting course'
        });
    }
};