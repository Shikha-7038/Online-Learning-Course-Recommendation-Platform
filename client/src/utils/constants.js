// utils/constants.js - Application-wide constants and configuration

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        UPDATE_PROFILE: '/auth/update-profile'
    },
    COURSES: {
        ALL: '/courses',
        FEATURED: '/courses/featured',
        CATEGORIES: '/courses/categories',
        SEARCH: '/courses/search',
        BY_CATEGORY: '/courses/category'
    },
    ENROLLMENTS: {
        MY_COURSES: '/enrollments/my-courses',
        CHECK: '/enrollments/check',
        STATUS: '/enrollments/status'
    },
    PROGRESS: {
        MY_PROGRESS: '/progress/my-progress',
        INIT: '/progress/init',
        UPDATE_LESSON: '/progress/update-lesson',
        COMPLETE_LESSON: '/progress/complete-lesson',
        OVERVIEW: '/progress/overview'
    },
    RECOMMENDATIONS: {
        PERSONALIZED: '/recommendations',
        SIMILAR: '/recommendations/similar',
        POPULAR: '/recommendations/popular',
        TRENDING: '/recommendations/trending',
        SKILL_GAP: '/recommendations/skill-gap'
    }
};

// Course categories
export const COURSE_CATEGORIES = [
    { id: 'web-dev', name: 'Web Development', icon: '🌐', color: 'bg-blue-500' },
    { id: 'data-science', name: 'Data Science', icon: '📊', color: 'bg-green-500' },
    { id: 'ai-ml', name: 'AI/ML', icon: '🤖', color: 'bg-purple-500' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒', color: 'bg-red-500' },
    { id: 'cloud-computing', name: 'Cloud Computing', icon: '☁️', color: 'bg-indigo-500' },
    { id: 'devops', name: 'DevOps', icon: '⚙️', color: 'bg-orange-500' },
    { id: 'mobile-dev', name: 'Mobile Development', icon: '📱', color: 'bg-pink-500' },
    { id: 'game-dev', name: 'Game Development', icon: '🎮', color: 'bg-yellow-500' },
    { id: 'database', name: 'Database', icon: '🗄️', color: 'bg-teal-500' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: 'bg-cyan-500' },
    { id: 'ui-ux', name: 'UI/UX Design', icon: '🎨', color: 'bg-rose-500' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: '📈', color: 'bg-emerald-500' }
];

// Course levels
export const COURSE_LEVELS = [
    { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-700' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-700' },
    { id: 'all-levels', name: 'All Levels', color: 'bg-gray-100 text-gray-700' }
];

// Learning goals
export const LEARNING_GOALS = [
    { id: 'career-change', name: 'Career Change', description: 'Switching to a new career path' },
    { id: 'skill-enhancement', name: 'Skill Enhancement', description: 'Improving existing skills' },
    { id: 'hobby', name: 'Hobby', description: 'Learning for personal enjoyment' },
    { id: 'academic', name: 'Academic', description: 'Supporting academic studies' },
    { id: 'certification', name: 'Certification', description: 'Preparing for certification exams' }
];

// User interests (for recommendations)
export const USER_INTERESTS = [
    'Web Development', 'Data Science', 'AI/ML', 'Cybersecurity',
    'Cloud Computing', 'DevOps', 'Mobile Development', 'Game Development',
    'Database', 'Blockchain', 'UI/UX Design', 'Digital Marketing'
];

// Skill options
export const SKILL_OPTIONS = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java',
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning',
    'Data Analysis', 'Cybersecurity', 'UI Design', 'Project Management'
];

// Progress status colors
export const PROGRESS_STATUS = {
    NOT_STARTED: { label: 'Not Started', color: 'bg-gray-500', textColor: 'text-gray-500' },
    IN_PROGRESS: { label: 'In Progress', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    ALMOST_DONE: { label: 'Almost Done', color: 'bg-blue-500', textColor: 'text-blue-600' },
    COMPLETED: { label: 'Completed', color: 'bg-green-500', textColor: 'text-green-600' }
};

// Get progress status based on percentage
export const getProgressStatus = (percentage) => {
    if (percentage === 0) return PROGRESS_STATUS.NOT_STARTED;
    if (percentage < 30) return PROGRESS_STATUS.IN_PROGRESS;
    if (percentage < 90) return PROGRESS_STATUS.ALMOST_DONE;
    return PROGRESS_STATUS.COMPLETED;
};

// Sort options for courses
export const SORT_OPTIONS = [
    { id: 'newest', name: 'Newest First', field: 'createdAt', order: -1 },
    { id: 'popular', name: 'Most Popular', field: 'totalEnrollments', order: -1 },
    { id: 'rating', name: 'Highest Rated', field: 'rating', order: -1 },
    { id: 'price-low', name: 'Price: Low to High', field: 'price', order: 1 },
    { id: 'price-high', name: 'Price: High to Low', field: 'price', order: -1 },
    { id: 'duration-short', name: 'Shortest First', field: 'duration', order: 1 },
    { id: 'duration-long', name: 'Longest First', field: 'duration', order: -1 }
];

// Local storage keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    LAST_VISITED: 'lastVisitedCourse',
    BOOKMARKS: 'bookmarks'
};

// Theme options
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
};

// Pagination defaults
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 12,
    LIMIT_OPTIONS: [12, 24, 36, 48]
};

// Date formats
export const DATE_FORMATS = {
    FULL: 'MMMM DD, YYYY',
    SHORT: 'MMM DD, YYYY',
    TIME: 'hh:mm A',
    RELATIVE: 'relative'
};

// Form validation rules
export const VALIDATION_RULES = {
    NAME: {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
        message: 'Name should only contain letters, spaces, hyphens, and apostrophes'
    },
    EMAIL: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    PASSWORD: {
        minLength: 6,
        maxLength: 50,
        message: 'Password must be at least 6 characters long'
    }
};

// Toast notification types
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
};

// Toast messages
export const TOAST_MESSAGES = {
    LOGIN_SUCCESS: 'Welcome back! 🎉',
    LOGOUT_SUCCESS: 'Logged out successfully',
    REGISTER_SUCCESS: 'Account created successfully! 🎉',
    ENROLL_SUCCESS: 'Successfully enrolled in course! 🎓',
    ENROLL_ERROR: 'Failed to enroll. Please try again.',
    PROGRESS_UPDATE: 'Progress updated! 📈',
    LESSON_COMPLETE: 'Lesson completed! 🎯',
    COURSE_COMPLETE: 'Congratulations! Course completed! 🏆',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SAVE_SUCCESS: 'Saved successfully! ✅',
    SAVE_ERROR: 'Failed to save. Please try again.'
};

// Chart colors for analytics
export const CHART_COLORS = {
    PRIMARY: '#3b82f6',
    SECONDARY: '#10b981',
    SUCCESS: '#22c55e',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#06b6d4',
    PURPLE: '#8b5cf6',
    PINK: '#ec4899',
    INDIGO: '#6366f1'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536
};

// Animation durations (ms)
export const ANIMATION_DURATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000
};

// Default images
export const DEFAULT_IMAGES = {
    COURSE_THUMBNAIL: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    USER_AVATAR: 'https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true',
    HERO_BANNER: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    EMPTY_STATE: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400'
};

// Feature flags (for gradual feature rollout)
export const FEATURES = {
    QUIZZES: true,
    CERTIFICATES: true,
    SOCIAL_SHARING: true,
    DISCUSSION_FORUM: false,
    LIVE_CLASSES: false,
    MOBILE_APP: false
};

// Social media links
export const SOCIAL_LINKS = {
    GITHUB: 'https://github.com/yourusername/online-learning-platform',
    TWITTER: 'https://twitter.com/yourapp',
    LINKEDIN: 'https://linkedin.com/company/yourapp',
    DISCORD: 'https://discord.gg/yourapp'
};

// Support contact
export const SUPPORT = {
    EMAIL: 'support@edulearn.com',
    PHONE: '+1 (555) 123-4567',
    HOURS: 'Mon-Fri, 9AM-6PM EST'
};

// File upload limits
export const UPLOAD_LIMITS = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
    MAX_VIDEO_SIZE: 100 * 1024 * 1024 // 100MB
};

// Route paths
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    COURSES: '/courses',
    COURSE_DETAIL: '/course/:id',
    COURSE_PLAYER: '/course/:id/play/:lessonIndex',
    MY_COURSES: '/my-courses',
    PROGRESS: '/progress',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    HELP: '/help',
    ABOUT: '/about'
};

// Helpful utility functions
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

export const formatDuration = (minutes) => {
    if (!minutes) return '0 min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
};

export const formatDate = (date, format = 'short') => {
    if (!date) return 'N/A';
    const d = new Date(date);
    if (format === 'short') {
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    if (format === 'long') {
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (format === 'relative') {
        const now = new Date();
        const diff = now - d;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return d.toLocaleDateString();
};

export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const getInitials = (name) => {
    if (!name) return 'U';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
    if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

export default {
    API_ENDPOINTS,
    COURSE_CATEGORIES,
    COURSE_LEVELS,
    LEARNING_GOALS,
    USER_INTERESTS,
    SKILL_OPTIONS,
    PROGRESS_STATUS,
    getProgressStatus,
    SORT_OPTIONS,
    STORAGE_KEYS,
    THEMES,
    PAGINATION,
    DATE_FORMATS,
    VALIDATION_RULES,
    TOAST_TYPES,
    TOAST_MESSAGES,
    CHART_COLORS,
    BREAKPOINTS,
    ANIMATION_DURATIONS,
    DEFAULT_IMAGES,
    FEATURES,
    SOCIAL_LINKS,
    SUPPORT,
    UPLOAD_LIMITS,
    ROUTES,
    formatCurrency,
    formatDuration,
    formatDate,
    truncateText,
    getInitials,
    calculateDiscount,
    shuffleArray,
    debounce,
    throttle
};