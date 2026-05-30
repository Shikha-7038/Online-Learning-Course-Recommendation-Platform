// controllers/progress.controller.js - Complete fixed version with time tracking

const Progress = require('../models/Progress.model');
const Enrollment = require('../models/Enrollment.model');
const Course = require('../models/Course.model');

// @desc    Get all progress for current user
// @route   GET /api/progress/my-progress
// @access  Private
exports.getMyProgress = async (req, res) => {
    try {
        const userId = req.user.id;

        const progress = await Progress.find({ user: userId })
            .populate('course')
            .sort({ updatedAt: -1 });

        // Calculate proper stats
        const totalCourses = progress.length;
        const completedCourses = progress.filter(p => p.overallProgress === 100).length;
        const averageProgress = totalCourses > 0 
            ? Math.round(progress.reduce((acc, p) => acc + (p.overallProgress || 0), 0) / totalCourses)
            : 0;
        
        // Convert minutes to hours for display
        const totalHoursSpent = Math.round(progress.reduce((acc, p) => acc + (p.totalTimeSpent || 0), 0) / 60);

        // Format progress data for response
        const formattedProgress = progress.map(p => ({
            _id: p._id,
            course: p.course,
            overallProgress: p.overallProgress,
            isCompleted: p.isCompleted,
            totalTimeSpent: Math.round(p.totalTimeSpent / 60), // Convert to hours
            totalTimeSpentMinutes: p.totalTimeSpent, // Keep original in minutes
            lessonProgress: p.lessonProgress,
            lastActivityAt: p.lastActivityAt,
            updatedAt: p.updatedAt
        }));

        res.json({
            success: true,
            progress: formattedProgress,
            stats: {
                totalCourses,
                completedCourses,
                averageProgress,
                totalHoursSpent
            }
        });

    } catch (error) {
        console.error('Get my progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching progress'
        });
    }
};

// @desc    Get progress for a specific course
// @route   GET /api/progress/:courseId
// @access  Private
exports.getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        let progress = await Progress.findOne({ 
            user: userId, 
            course: courseId 
        }).populate('course');

        if (!progress) {
            // Check if user is enrolled but progress doesn't exist
            const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
            
            if (enrollment) {
                const course = await Course.findById(courseId);
                if (course && course.lessons) {
                    const lessonProgress = course.lessons.map(lesson => ({
                        lessonId: lesson._id,
                        lessonTitle: lesson.title,
                        completed: false,
                        watchedDuration: 0,
                        lastPosition: 0
                    }));
                    
                    progress = await Progress.create({
                        user: userId,
                        course: courseId,
                        enrollment: enrollment._id,
                        lessonProgress,
                        overallProgress: 0,
                        totalTimeSpent: 0,
                        isCompleted: false
                    });
                    
                    progress = await progress.populate('course');
                }
            }
        }

        // Format response with time in hours
        const formattedProgress = progress ? {
            ...progress.toObject(),
            totalTimeSpentHours: Math.round((progress.totalTimeSpent || 0) / 60),
            totalTimeSpentMinutes: progress.totalTimeSpent || 0
        } : null;

        res.json({
            success: true,
            progress: formattedProgress,
            message: progress ? 'Progress found' : 'No progress found for this course'
        });

    } catch (error) {
        console.error('Get course progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching course progress'
        });
    }
};

// @desc    Initialize progress for a course
// @route   POST /api/progress/init/:courseId
// @access  Private
exports.initProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: 'You are not enrolled in this course'
            });
        }

        let progress = await Progress.findOne({ user: userId, course: courseId });

        if (progress) {
            return res.json({
                success: true,
                progress,
                message: 'Progress already initialized'
            });
        }

        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lessonProgress = course.lessons.map(lesson => ({
            lessonId: lesson._id,
            lessonTitle: lesson.title,
            completed: false,
            watchedDuration: 0,
            lastPosition: 0
        }));

        progress = await Progress.create({
            user: userId,
            course: courseId,
            enrollment: enrollment._id,
            lessonProgress,
            overallProgress: 0,
            totalTimeSpent: 0,
            isCompleted: false
        });

        res.status(201).json({
            success: true,
            progress,
            message: 'Progress initialized successfully'
        });

    } catch (error) {
        console.error('Init progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while initializing progress'
        });
    }
};

// @desc    Update lesson progress
// @route   PUT /api/progress/:courseId/lesson/:lessonId
// @access  Private
exports.updateLessonProgress = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const { watchedDuration, lastPosition } = req.body;
        const userId = req.user.id;

        let progress = await Progress.findOne({ user: userId, course: courseId });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress not found'
            });
        }

        const lessonIndex = progress.lessonProgress.findIndex(
            lp => lp.lessonId.toString() === lessonId
        );

        if (lessonIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found in progress'
            });
        }

        // Update lesson progress
        if (watchedDuration !== undefined) {
            progress.lessonProgress[lessonIndex].watchedDuration = watchedDuration;
        }
        if (lastPosition !== undefined) {
            progress.lessonProgress[lessonIndex].lastPosition = lastPosition;
        }

        progress.lastActivityAt = Date.now();
        
        // Update total time spent (add new watched duration)
        if (watchedDuration) {
            progress.totalTimeSpent += watchedDuration / 60; // Convert seconds to minutes
        }

        await progress.save();

        res.json({
            success: true,
            progress: {
                ...progress.toObject(),
                totalTimeSpentHours: Math.round(progress.totalTimeSpent / 60)
            },
            message: 'Lesson progress updated'
        });

    } catch (error) {
        console.error('Update lesson progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating lesson progress'
        });
    }
};

// @desc    Mark a lesson as complete
// @route   POST /api/progress/:courseId/complete-lesson/:lessonId
// @access  Private
exports.completeLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const userId = req.user.id;

        let progress = await Progress.findOne({ user: userId, course: courseId });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress not found'
            });
        }

        const lessonIndex = progress.lessonProgress.findIndex(
            lp => lp.lessonId.toString() === lessonId
        );

        if (lessonIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found in progress'
            });
        }

        if (!progress.lessonProgress[lessonIndex].completed) {
            // Get the lesson duration from course
            const course = await Course.findById(courseId);
            const lesson = course?.lessons?.find(l => l._id.toString() === lessonId);
            const lessonDuration = lesson?.duration || 30; // Default 30 minutes
            
            progress.lessonProgress[lessonIndex].completed = true;
            progress.lessonProgress[lessonIndex].completedAt = Date.now();
            // Set watched duration to full lesson duration
            progress.lessonProgress[lessonIndex].watchedDuration = lessonDuration * 60;
            
            // Add to total time spent (in minutes)
            progress.totalTimeSpent += lessonDuration;
            
            // Update overall progress
            const totalLessons = progress.lessonProgress.length;
            const completedLessons = progress.lessonProgress.filter(lp => lp.completed).length;
            progress.overallProgress = Math.round((completedLessons / totalLessons) * 100);
            
            // Check if course is completed
            if (progress.overallProgress === 100) {
                progress.isCompleted = true;
                
                await Enrollment.findOneAndUpdate(
                    { user: userId, course: courseId },
                    { status: 'completed', completedAt: Date.now() }
                );
            }
            
            await progress.save();
        }

        res.json({
            success: true,
            progress: {
                ...progress.toObject(),
                totalTimeSpentHours: Math.round(progress.totalTimeSpent / 60)
            },
            message: 'Lesson marked as complete'
        });

    } catch (error) {
        console.error('Complete lesson error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while completing lesson'
        });
    }
};

// @desc    Get progress overview for a course
// @route   GET /api/progress/:courseId/overview
// @access  Private
exports.getProgressOverview = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        let progress = await Progress.findOne({ user: userId, course: courseId });

        if (!progress) {
            const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
            if (enrollment) {
                const course = await Course.findById(courseId);
                if (course) {
                    const lessonProgress = course.lessons.map(lesson => ({
                        lessonId: lesson._id,
                        lessonTitle: lesson.title,
                        completed: false,
                        watchedDuration: 0,
                        lastPosition: 0
                    }));
                    
                    progress = await Progress.create({
                        user: userId,
                        course: courseId,
                        enrollment: enrollment._id,
                        lessonProgress,
                        overallProgress: 0,
                        totalTimeSpent: 0,
                        isCompleted: false
                    });
                }
            }
        }

        if (!progress) {
            return res.json({
                success: true,
                hasProgress: false,
                message: 'No progress data available'
            });
        }

        const completedLessons = progress.lessonProgress.filter(lp => lp.completed).length;
        const totalLessons = progress.lessonProgress.length;

        res.json({
            success: true,
            hasProgress: true,
            overview: {
                overallProgress: progress.overallProgress,
                completedLessons,
                totalLessons,
                isCompleted: progress.isCompleted,
                totalTimeSpentMinutes: progress.totalTimeSpent,
                totalTimeSpentHours: Math.round(progress.totalTimeSpent / 60),
                lastActivityAt: progress.lastActivityAt,
                lessons: progress.lessonProgress.map(lp => ({
                    lessonId: lp.lessonId,
                    title: lp.lessonTitle,
                    completed: lp.completed,
                    watchedDuration: lp.watchedDuration,
                    lastPosition: lp.lastPosition
                }))
            }
        });

    } catch (error) {
        console.error('Get progress overview error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching progress overview'
        });
    }
};

// @desc    Fix progress for existing enrollments
// @route   POST /api/progress/fix/:courseId
// @access  Private
exports.fixProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
        
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (!course.lessons || course.lessons.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Course has no lessons'
            });
        }

        // Calculate total minutes from all lessons
        const totalMinutes = course.lessons.reduce((acc, lesson) => acc + (lesson.duration || 30), 0);

        // Create lesson progress with all lessons completed and time tracked
        const lessonProgress = course.lessons.map(lesson => ({
            lessonId: lesson._id,
            lessonTitle: lesson.title,
            completed: true,
            completedAt: new Date(),
            watchedDuration: (lesson.duration || 30) * 60, // Convert to seconds
            lastPosition: 0
        }));

        let progress = await Progress.findOne({ user: userId, course: courseId });
        
        if (progress) {
            progress.lessonProgress = lessonProgress;
            progress.overallProgress = 100;
            progress.isCompleted = true;
            progress.totalTimeSpent = totalMinutes; // Store in minutes
            progress.lastActivityAt = new Date();
            await progress.save();
        } else {
            progress = await Progress.create({
                user: userId,
                course: courseId,
                enrollment: enrollment._id,
                lessonProgress: lessonProgress,
                overallProgress: 100,
                isCompleted: true,
                totalTimeSpent: totalMinutes,
                lastActivityAt: new Date()
            });
        }

        if (enrollment.status !== 'completed') {
            enrollment.status = 'completed';
            enrollment.completedAt = new Date();
            await enrollment.save();
        }

        res.json({
            success: true,
            message: 'Progress fixed successfully!',
            progress: {
                overallProgress: progress.overallProgress,
                isCompleted: progress.isCompleted,
                totalTimeSpentMinutes: progress.totalTimeSpent,
                totalTimeSpentHours: Math.round(progress.totalTimeSpent / 60),
                totalLessons: lessonProgress.length,
                completedLessons: lessonProgress.filter(l => l.completed).length
            }
        });

    } catch (error) {
        console.error('Fix progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fixing progress'
        });
    }
};