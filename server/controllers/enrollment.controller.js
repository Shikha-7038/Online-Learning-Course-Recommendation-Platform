// controllers/enrollment.controller.js - Enrollment logic (COMPLETE FIXED)

const Enrollment = require('../models/Enrollment.model');
const Course = require('../models/Course.model');
const Progress = require('../models/Progress.model');

// @desc    Enroll in a course
// @route   POST /api/enrollments/:courseId
// @access  Private
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ 
            user: userId, 
            course: courseId 
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course'
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId,
            enrolledAt: Date.now(),
            status: 'active'
        });

        // Update course enrollment count
        course.totalEnrollments += 1;
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Successfully enrolled in course',
            enrollment
        });

    } catch (error) {
        console.error('Enroll in course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while enrolling in course'
        });
    }
};

// @desc    Get all enrolled courses for current user
// @route   GET /api/enrollments/my-courses
// @access  Private
exports.getMyEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get all enrollments
        const enrollments = await Enrollment.find({ 
            user: userId,
            status: { $in: ['active', 'completed'] }
        }).populate('course');

        // Get progress for each enrollment
        const enrolledCourses = [];
        
        for (const enrollment of enrollments) {
            const progress = await Progress.findOne({ 
                user: userId, 
                course: enrollment.course?._id 
            });
            
            enrolledCourses.push({
                enrollmentId: enrollment._id,
                course: enrollment.course,
                status: enrollment.status,
                enrolledAt: enrollment.enrolledAt,
                completedAt: enrollment.completedAt,
                progress: progress ? {
                    overallProgress: progress.overallProgress,
                    isCompleted: progress.isCompleted,
                    totalTimeSpent: progress.totalTimeSpent
                } : null
            });
        }

        res.json({
            success: true,
            courses: enrolledCourses,
            total: enrolledCourses.length
        });

    } catch (error) {
        console.error('Get enrolled courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching enrolled courses'
        });
    }
};

// @desc    Check if user is enrolled in a course
// @route   GET /api/enrollments/check/:courseId
// @access  Private
exports.checkEnrollment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({ 
            user: userId, 
            course: courseId,
            status: { $ne: 'dropped' }
        });

        res.json({
            success: true,
            isEnrolled: !!enrollment,
            enrollment: enrollment || null
        });

    } catch (error) {
        console.error('Check enrollment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while checking enrollment'
        });
    }
};

// @desc    Update enrollment status
// @route   PUT /api/enrollments/:courseId/status
// @access  Private
exports.updateEnrollmentStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { status } = req.body;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        enrollment.status = status;
        
        if (status === 'completed') {
            enrollment.completedAt = Date.now();
        }

        await enrollment.save();

        res.json({
            success: true,
            message: `Enrollment status updated to ${status}`,
            enrollment
        });

    } catch (error) {
        console.error('Update enrollment status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating enrollment status'
        });
    }
};

// @desc    Drop a course
// @route   DELETE /api/enrollments/:courseId
// @access  Private
exports.dropCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOneAndUpdate(
            { user: userId, course: courseId },
            { status: 'dropped' },
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Update course enrollment count
        await Course.findByIdAndUpdate(courseId, { $inc: { totalEnrollments: -1 } });

        res.json({
            success: true,
            message: 'Successfully dropped the course'
        });

    } catch (error) {
        console.error('Drop course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while dropping course'
        });
    }
};