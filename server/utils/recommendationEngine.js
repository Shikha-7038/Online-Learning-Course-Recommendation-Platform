// utils/recommendationEngine.js - Recommendation algorithms

const Course = require('../models/Course.model');

// Calculate similarity score between user interests/skills and course
const calculateRelevanceScore = (user, course) => {
    let score = 0;
    let weight = {
        interests: 3,      // High weight - user's stated interests
        skills: 2,         // Medium weight - matching skills to learn
        category: 2,       // Medium weight - course category
        tags: 1,           // Low weight - course tags
        prerequisites: -1   // Negative - don't recommend if missing prerequisites
    };

    // Check prerequisites (negative impact)
    if (course.prerequisites && course.prerequisites.length > 0) {
        const hasPrerequisites = course.prerequisites.some(prereq =>
            user.skills && user.skills.includes(prereq)
        );
        if (!hasPrerequisites && course.prerequisites.length > 0) {
            score += -5; // Strong negative for missing prerequisites
        }
    }

    // Match interests (highest weight)
    if (user.interests && course.category) {
        if (user.interests.includes(course.category)) {
            score += weight.interests * 10;
        }
        
        // Check if category is related to interest
        user.interests.forEach(interest => {
            if (course.tags && course.tags.includes(interest)) {
                score += weight.interests * 5;
            }
            if (course.skillsTaught && course.skillsTaught.includes(interest)) {
                score += weight.interests * 3;
            }
        });
    }

    // Match skills the user wants to learn
    if (user.skills && course.skillsTaught) {
        const matchingSkills = course.skillsTaught.filter(skill =>
            !user.skills.includes(skill) // Skills they don't already have
        );
        score += matchingSkills.length * weight.skills * 2;
    }

    // Match course category
    if (user.interests && user.interests.includes(course.category)) {
        score += weight.category * 5;
    }

    // Match tags
    if (user.interests && course.tags) {
        const matchingTags = course.tags.filter(tag =>
            user.interests.includes(tag)
        );
        score += matchingTags.length * weight.tags;
    }

    // Boost for popular courses
    if (course.rating && course.rating > 4) {
        score += course.rating * 2;
    }
    
    if (course.totalEnrollments && course.totalEnrollments > 100) {
        score += 5;
    }

    return Math.max(0, score);
};

// Get user-based recommendations
exports.getUserBasedRecommendations = async (user, limit = 20) => {
    try {
        // Get all published courses
        const allCourses = await Course.find({ isPublished: true });
        
        // Calculate relevance score for each course
        const scoredCourses = allCourses.map(course => ({
            course,
            score: calculateRelevanceScore(user, course)
        }));
        
        // Sort by score (highest first)
        scoredCourses.sort((a, b) => b.score - a.score);
        
        // Return top courses
        return scoredCourses.slice(0, limit).map(item => item.course);
        
    } catch (error) {
        console.error('Recommendation engine error:', error);
        return [];
    }
};

// Get similar courses based on a source course
exports.getSimilarCourses = async (sourceCourse, limit = 6) => {
    try {
        // Find courses with similar category, tags, or skills
        const similarCourses = await Course.find({
            _id: { $ne: sourceCourse._id }, // Exclude source course
            isPublished: true,
            $or: [
                { category: sourceCourse.category },
                { tags: { $in: sourceCourse.tags || [] } },
                { skillsTaught: { $in: sourceCourse.skillsTaught || [] } },
                { level: sourceCourse.level }
            ]
        });

        // Score each similar course
        const scoredCourses = similarCourses.map(course => {
            let score = 0;
            
            // Same category
            if (course.category === sourceCourse.category) {
                score += 10;
            }
            
            // Common tags
            if (course.tags && sourceCourse.tags) {
                const commonTags = course.tags.filter(tag => 
                    sourceCourse.tags.includes(tag)
                );
                score += commonTags.length * 2;
            }
            
            // Common skills
            if (course.skillsTaught && sourceCourse.skillsTaught) {
                const commonSkills = course.skillsTaught.filter(skill =>
                    sourceCourse.skillsTaught.includes(skill)
                );
                score += commonSkills.length;
            }
            
            // Same level
            if (course.level === sourceCourse.level) {
                score += 5;
            }
            
            // Rating boost
            if (course.rating) {
                score += course.rating;
            }
            
            return { course, score };
        });
        
        // Sort by score and return top results
        scoredCourses.sort((a, b) => b.score - a.score);
        return scoredCourses.slice(0, limit).map(item => item.course);
        
    } catch (error) {
        console.error('Get similar courses error:', error);
        return [];
    }
};

// Get skill gap recommendations
exports.getSkillGapRecommendations = async (user, enrolledSkills = [], limit = 20) => {
    try {
        // Get all published courses
        const allCourses = await Course.find({ isPublished: true });
        
        // Calculate skill gap score
        const scoredCourses = allCourses.map(course => {
            let score = 0;
            
            // Find skills in course that user doesn't have
            const newSkills = course.skillsTaught?.filter(skill =>
                !enrolledSkills.includes(skill) &&
                (!user.skills || !user.skills.includes(skill))
            ) || [];
            
            // Higher score for courses teaching more new skills
            score += newSkills.length * 10;
            
            // Match with user interests
            if (user.interests && course.category) {
                if (user.interests.includes(course.category)) {
                    score += 15;
                }
            }
            
            // Course level appropriateness
            if (course.level === 'Beginner' && (!user.skills || user.skills.length === 0)) {
                score += 5;
            } else if (course.level === 'Advanced' && user.skills && user.skills.length > 3) {
                score += 5;
            } else if (course.level === 'Intermediate') {
                score += 3;
            }
            
            return { course, score, newSkills };
        });
        
        // Sort by score
        scoredCourses.sort((a, b) => b.score - a.score);
        
        // Return top courses with skill gap info
        return scoredCourses.slice(0, limit).map(item => item.course);
        
    } catch (error) {
        console.error('Get skill gap recommendations error:', error);
        return [];
    }
};

// Get hybrid recommendations (combine multiple strategies)
exports.getHybridRecommendations = async (user, limit = 20) => {
    try {
        // Get recommendations from different strategies
        const userBased = await exports.getUserBasedRecommendations(user, limit);
        const skillGap = await exports.getSkillGapRecommendations(user, [], limit);
        
        // Combine and deduplicate
        const combined = [...userBased, ...skillGap];
        const uniqueCourses = new Map();
        
        combined.forEach(course => {
            if (!uniqueCourses.has(course._id.toString())) {
                uniqueCourses.set(course._id.toString(), course);
            }
        });
        
        // Convert back to array and limit
        return Array.from(uniqueCourses.values()).slice(0, limit);
        
    } catch (error) {
        console.error('Get hybrid recommendations error:', error);
        return [];
    }
};