// utils/helpers.js - Helper utility functions

/**
 * Format date to readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format time duration (minutes to readable string)
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
const formatDuration = (minutes) => {
    if (!minutes || minutes === 0) return '0 min';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins} min`;
};

/**
 * Calculate course progress percentage
 * @param {number} completedLessons - Number of completed lessons
 * @param {number} totalLessons - Total lessons in course
 * @returns {number} Progress percentage (0-100)
 */
const calculateProgress = (completedLessons, totalLessons) => {
    if (!totalLessons || totalLessons === 0) return 0;
    return Math.round((completedLessons / totalLessons) * 100);
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID
 */
const generateRandomId = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
const truncateText = (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

/**
 * Calculate average rating from array of ratings
 * @param {Array} ratings - Array of rating numbers
 * @returns {number} Average rating
 */
const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
};

/**
 * Sanitize user input (prevent XSS)
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
    if (!input) return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

/**
 * Check if user has prerequisite skills for a course
 * @param {Array} userSkills - User's current skills
 * @param {Array} prerequisites - Course prerequisites
 * @returns {boolean} True if user meets prerequisites
 */
const hasPrerequisites = (userSkills, prerequisites) => {
    if (!prerequisites || prerequisites.length === 0) return true;
    if (!userSkills || userSkills.length === 0) return false;
    
    return prerequisites.every(prereq => 
        userSkills.some(skill => 
            skill.toLowerCase() === prereq.toLowerCase()
        )
    );
};

/**
 * Extract unique categories from courses
 * @param {Array} courses - Array of course objects
 * @returns {Array} Unique categories
 */
const extractCategories = (courses) => {
    if (!courses || courses.length === 0) return [];
    const categories = new Set();
    courses.forEach(course => {
        if (course.category) categories.add(course.category);
    });
    return Array.from(categories).sort();
};

/**
 * Paginate array
 * @param {Array} array - Array to paginate
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Object} Paginated result
 */
const paginate = (array, page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {};
    
    if (endIndex < array.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }
    
    results.data = array.slice(startIndex, endIndex);
    results.total = array.length;
    results.totalPages = Math.ceil(array.length / limit);
    results.currentPage = page;
    
    return results;
};

/**
 * Sleep/Delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get time ago string (e.g., "2 days ago")
 * @param {Date} date - Date to compare
 * @returns {string} Time ago string
 */
const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return 'just now';
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
const validatePasswordStrength = (password) => {
    const result = {
        isValid: true,
        errors: []
    };
    
    if (!password || password.length < 6) {
        result.isValid = false;
        result.errors.push('Password must be at least 6 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one number');
    }
    
    return result;
};

/**
 * Convert object to query string
 * @param {Object} params - Parameters object
 * @returns {string} Query string
 */
const toQueryString = (params) => {
    return Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

/**
 * Parse query string to object
 * @param {string} queryString - Query string
 * @returns {Object} Parsed object
 */
const parseQueryString = (queryString) => {
    const params = {};
    const search = queryString.startsWith('?') ? queryString.substring(1) : queryString;
    
    if (!search) return params;
    
    search.split('&').forEach(part => {
        const [key, value] = part.split('=');
        if (key && value !== undefined) {
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    });
    
    return params;
};

module.exports = {
    formatDate,
    formatDuration,
    calculateProgress,
    generateRandomId,
    isValidEmail,
    truncateText,
    calculateAverageRating,
    sanitizeInput,
    hasPrerequisites,
    extractCategories,
    paginate,
    sleep,
    timeAgo,
    deepClone,
    validatePasswordStrength,
    toQueryString,
    parseQueryString
};