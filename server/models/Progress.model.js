// models/Progress.model.js - Progress schema to track learning progress

const mongoose = require('mongoose');

// Individual lesson progress
const lessonProgressSchema = new mongoose.Schema({
    lessonId: {
        type: String,
        required: true
    },
    lessonTitle: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    watchedDuration: {
        type: Number, // Duration watched in seconds
        default: 0
    },
    lastPosition: {
        type: Number, // Last watched position in seconds
        default: 0
    },
    notes: {
        type: String,
        default: ''
    }
});

// Main progress schema
const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course is required']
    },
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: [true, 'Enrollment is required']
    },
    // Array of lesson progress
    lessonProgress: [lessonProgressSchema],
    
    // Overall progress percentage (0-100)
    overallProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    
    // Time spent tracking
    totalTimeSpent: {
        type: Number, // Total minutes spent
        default: 0
    },
    
    // Completion status
    isCompleted: {
        type: Boolean,
        default: false
    },
    
    // Quiz scores (for future implementation)
    quizScores: {
        type: Map,
        of: Number,
        default: {}
    },
    
    // Last activity
    lastActivityAt: {
        type: Date,
        default: Date.now
    },
    
    // Certificate earned
    certificateEarned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Ensure one progress record per user per enrollment
progressSchema.index({ user: 1, enrollment: 1 }, { unique: true });

// Method to update overall progress
progressSchema.methods.updateOverallProgress = function() {
    const totalLessons = this.lessonProgress.length;
    if (totalLessons === 0) {
        this.overallProgress = 0;
        return this.overallProgress;
    }
    
    const completedLessons = this.lessonProgress.filter(lp => lp.completed).length;
    this.overallProgress = Math.round((completedLessons / totalLessons) * 100);
    
    // Mark course as completed if all lessons are done
    if (this.overallProgress === 100 && !this.isCompleted) {
        this.isCompleted = true;
        this.completedAt = new Date();
    }
    
    return this.overallProgress;
};

module.exports = mongoose.model('Progress', progressSchema);
