// models/Course.model.js - Complete working version without next() issues

const mongoose = require('mongoose');

// Lesson sub-schema
const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Lesson title is required']
    },
    description: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    isFree: {
        type: Boolean,
        default: false
    }
});

// Course schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    subtitle: {
        type: String,
        maxlength: [300, 'Subtitle cannot exceed 300 characters'],
        default: ''
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['Web Development', 'Data Science', 'AI/ML', 'Cybersecurity', 
               'Cloud Computing', 'DevOps', 'Mobile Development', 'Game Development',
               'Database', 'Blockchain', 'UI/UX Design', 'Digital Marketing']
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
        default: 'Beginner'
    },
    tags: {
        type: [String],
        default: []
    },
    skillsTaught: {
        type: [String],
        default: []
    },
    prerequisites: {
        type: [String],
        default: []
    },
    thumbnail: {
        type: String,
        default: 'https://via.placeholder.com/400x250?text=Course+Thumbnail'
    },
    instructor: {
        type: String,
        required: [true, 'Instructor name is required']
    },
    instructorBio: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    duration: {
        type: Number,
        default: 0
    },
    lessons: [lessonSchema],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    totalEnrollments: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    whatYouWillLearn: {
        type: [String],
        default: []
    },
    requirements: {
        type: [String],
        default: []
    },
    language: {
        type: String,
        default: 'English'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// ========== NO pre('save') MIDDLEWARE ==========
// The problematic code has been removed completely
// totalLessons will be calculated dynamically using lessons.length

// Method to get course summary
courseSchema.methods.getSummary = function() {
    return {
        _id: this._id,
        title: this.title,
        subtitle: this.subtitle,
        description: this.description.substring(0, 200),
        category: this.category,
        level: this.level,
        thumbnail: this.thumbnail,
        instructor: this.instructor,
        rating: this.rating,
        totalEnrollments: this.totalEnrollments,
        duration: this.duration,
        totalLessons: this.lessons.length,  // Dynamic calculation
        price: this.price
    };
};

// Safe model export - prevents overwrite error
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

module.exports = Course;