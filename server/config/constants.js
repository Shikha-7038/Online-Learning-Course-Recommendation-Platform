const USER_ROLES = {
    STUDENT: 'student',
    INSTRUCTOR: 'instructor',
    ADMIN: 'admin'
};

const COURSE_LEVELS = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
    ALL_LEVELS: 'All Levels'
};

const COURSE_CATEGORIES = [
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

const LEARNING_GOALS = {
    CAREER_CHANGE: 'Career Change',
    SKILL_ENHANCEMENT: 'Skill Enhancement',
    HOBBY: 'Hobby',
    ACADEMIC: 'Academic',
    CERTIFICATION: 'Certification'
};

const ENROLLMENT_STATUS = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    DROPPED: 'dropped',
    PAUSED: 'paused'
};

const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    REFUNDED: 'refunded',
    FREE: 'free'
};

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

const RESPONSE_MESSAGES = {
    REGISTER_SUCCESS: 'User registered successfully',
    REGISTER_FAIL: 'Registration failed',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAIL: 'Invalid credentials',
    LOGOUT_SUCCESS: 'Logged out successfully',
    USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_EXPIRED: 'Token expired, please login again',
    
    COURSE_NOT_FOUND: 'Course not found',
    COURSE_CREATED: 'Course created successfully',
    COURSE_UPDATED: 'Course updated successfully',
    COURSE_DELETED: 'Course deleted successfully',
    
    ENROLLMENT_SUCCESS: 'Successfully enrolled in course',
    ALREADY_ENROLLED: 'Already enrolled in this course',
    ENROLLMENT_NOT_FOUND: 'Enrollment not found',
    COURSE_DROPPED: 'Course dropped successfully',
    
    PROGRESS_UPDATED: 'Progress updated successfully',
    PROGRESS_NOT_FOUND: 'Progress not found',
    LESSON_COMPLETED: 'Lesson marked as complete',
    
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    NOT_FOUND: 'Resource not found'
};

const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 12,
    MAX_LIMIT: 100
};

const JWT_CONFIG = {
    EXPIRES_IN: '7d',
    ALGORITHM: 'HS256'
};

const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, 
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm']
};

const CORS_CONFIG = {
    ALLOWED_ORIGINS: ['http://localhost:5173', 'http://localhost:3000'],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization', 'X-Requested-With'],
    CREDENTIALS: true,
    MAX_AGE: 86400
};

const RATE_LIMIT = {
    WINDOW_MS: 15 * 60 * 1000, 
    MAX_REQUESTS: 100,
    MESSAGE: 'Too many requests from this IP, please try again later.'
};

const PASSWORD_RULES = {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: false
};

const CACHE_TTL = {
    COURSES: 3600, // 1 hour
    RECOMMENDATIONS: 7200, // 2 hours
    USER_DATA: 1800 // 30 minutes
};

const RECOMMENDATION_WEIGHTS = {
    INTERESTS: 3,
    SKILLS: 2,
    CATEGORY: 2,
    TAGS: 1,
    RATING: 1.5,
    POPULARITY: 1,
    PREREQUISITES: -1
};

const DEFAULT_AVATARS = {
    STUDENT: 'https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true',
    INSTRUCTOR: 'https://ui-avatars.com/api/?background=0EA5E9&color=fff&bold=true',
    ADMIN: 'https://ui-avatars.com/api/?background=EF4444&color=fff&bold=true'
};

const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400';

const SEARCH_CONFIG = {
    MIN_SEARCH_LENGTH: 2,
    MAX_SEARCH_RESULTS: 50,
    SEARCH_FIELDS: ['title', 'description', 'tags', 'skillsTaught', 'category']
};

module.exports = {
    USER_ROLES,
    COURSE_LEVELS,
    COURSE_CATEGORIES,
    LEARNING_GOALS,
    ENROLLMENT_STATUS,
    PAYMENT_STATUS,
    HTTP_STATUS,
    RESPONSE_MESSAGES,
    PAGINATION,
    JWT_CONFIG,
    FILE_UPLOAD,
    CORS_CONFIG,
    RATE_LIMIT,
    PASSWORD_RULES,
    CACHE_TTL,
    RECOMMENDATION_WEIGHTS,
    DEFAULT_AVATARS,
    DEFAULT_THUMBNAIL,
    SEARCH_CONFIG
};