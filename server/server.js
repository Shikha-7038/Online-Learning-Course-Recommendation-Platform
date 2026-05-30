const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const progressRoutes = require('./routes/progress.routes');
const recommendationRoutes = require('./routes/recommendation.routes');

const errorMiddleware = require('./middleware/error.middleware');
const Course = require('./models/Course.model');
const Enrollment = require('./models/Enrollment.model');
const Progress = require('./models/Progress.model');
const sampleCourses = require('./data/sampleCourses');

// Initialize express app
const app = express();

// ============ MIDDLEWARE ============

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// ============ HEALTH CHECK ROUTE ============
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running successfully',
        timestamp: new Date().toISOString()
    });
});

// ============ API ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/recommendations', recommendationRoutes);

// ============ ERROR HANDLING ============
app.use(errorMiddleware);

// ============ AUTO-SEED FUNCTION ============
const seedCoursesIfEmpty = async () => {
    try {
        // Check if there are any courses in the database
        const courseCount = await Course.countDocuments();
        
        if (courseCount === 0) {
            console.log('📚 No courses found. Adding sample courses...');
            
            // Add sample courses
            const inserted = await Course.insertMany(sampleCourses);
            console.log(`✅ Added ${inserted.length} sample courses to database!`);
            
            // Show what was added
            console.log('\n📋 Courses added:');
            inserted.forEach((course, index) => {
                console.log(`   ${index + 1}. ${course.title} (${course.category})`);
            });
        } else {
            console.log(`📚 Database already has ${courseCount} courses. No seeding needed.`);
        }
    } catch (error) {
        console.error('❌ Error auto-seeding courses:', error.message);
    }
};

// ============ FIX PROGRESS FUNCTION WITH TIME CALCULATION ============
const fixProgressForCompletedEnrollments = async () => {
    try {
        console.log('\n🔧 Checking for progress issues...');
        
        const enrollments = await Enrollment.find({ 
            status: 'completed' 
        }).populate('course');

        if (enrollments.length === 0) {
            console.log('📊 No completed enrollments found.');
            return;
        }

        console.log(`📊 Found ${enrollments.length} completed enrollment(s) to check.\n`);

        let fixed = 0;
        let alreadyCorrect = 0;

        for (const enrollment of enrollments) {
            const course = enrollment.course;
            
            if (!course || !course.lessons || course.lessons.length === 0) {
                console.log(`⚠️ Skipping - No lessons found for: ${course?.title || 'Unknown course'}`);
                continue;
            }

            // Calculate total minutes from all lessons
            const totalMinutes = course.lessons.reduce((acc, lesson) => acc + (lesson.duration || 30), 0);
            const totalHours = (totalMinutes / 60).toFixed(1);

            const existingProgress = await Progress.findOne({ 
                user: enrollment.user, 
                course: enrollment.course 
            });

            if (existingProgress && existingProgress.overallProgress === 100 && existingProgress.totalTimeSpent > 0) {
                console.log(`✅ Already correct: ${course.title} - Progress: ${existingProgress.overallProgress}%, Time: ${(existingProgress.totalTimeSpent / 60).toFixed(1)}h`);
                alreadyCorrect++;
                continue;
            }

            // Create lesson progress with time tracking
            const lessonProgress = course.lessons.map(lesson => ({
                lessonId: lesson._id,
                lessonTitle: lesson.title,
                completed: true,
                completedAt: new Date(),
                watchedDuration: (lesson.duration || 30) * 60,
                lastPosition: 0
            }));

            const progress = await Progress.findOneAndUpdate(
                { user: enrollment.user, course: enrollment.course },
                {
                    user: enrollment.user,
                    course: enrollment.course,
                    enrollment: enrollment._id,
                    lessonProgress: lessonProgress,
                    overallProgress: 100,
                    isCompleted: true,
                    totalTimeSpent: totalMinutes,
                    lastActivityAt: new Date()
                },
                { upsert: true, new: true }
            );

            fixed++;
            console.log(`✅ Fixed: ${course.title}`);
            console.log(`   - Progress: ${progress.overallProgress}%`);
            console.log(`   - Lessons: ${progress.lessonProgress.length}/${progress.lessonProgress.length} completed`);
            console.log(`   - Time Spent: ${(progress.totalTimeSpent / 60).toFixed(1)} hours (${progress.totalTimeSpent} minutes)`);
        }

        if (fixed > 0) {
            console.log(`\n🎉 Progress Fix Complete!`);
            console.log(`   ✅ Fixed: ${fixed} course(s)`);
            console.log(`   ✔️ Already correct: ${alreadyCorrect} course(s)`);
        } else if (alreadyCorrect > 0) {
            console.log(`\n✅ All ${alreadyCorrect} completed enrollment(s) have correct progress!`);
        }

    } catch (error) {
        console.error('❌ Error fixing progress:', error.message);
    }
};

// ============ DATABASE CONNECTION ============
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
        console.log(`📁 Database: ${mongoose.connection.name}`);
        
        // Auto-seed courses AFTER successful connection
        await seedCoursesIfEmpty();
        
        // Auto-fix progress for completed enrollments
        await fixProgressForCompletedEnrollments();
        
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`\n🚀 Server running on port ${PORT}`);
        console.log(`🔗 API URL: http://localhost:${PORT}/api`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
        console.log(`\n✨ Ready to use! Visit http://localhost:5173`);
    });
};

startServer();

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});