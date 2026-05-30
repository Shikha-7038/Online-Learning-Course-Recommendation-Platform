import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentService } from '../services/enrollmentService';
import { progressService } from '../services/progressService';
import ProgressBar from '../components/ProgressBar';
import { FiPlayCircle, FiAward, FiClock } from 'react-icons/fi';

const EnrolledCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await enrollmentService.getMyEnrolledCourses();
      const enrolledData = res.data.courses || [];
      setEnrollments(enrolledData);
      
      // Fetch progress for each course
      const progressPromises = enrolledData.map(enrollment =>
        progressService.getCourseProgress(enrollment.course._id)
      );
      const progressResults = await Promise.allSettled(progressPromises);
      
      const progressData = {};
      progressResults.forEach((result, idx) => {
        if (result.status === 'fulfilled' && result.value.data.progress) {
          progressData[enrolledData[idx].course._id] = result.value.data.progress;
        }
      });
      setProgressMap(progressData);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (courseId) => {
    return progressMap[courseId]?.overallProgress || 0;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <div className="h-24 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
      <p className="text-gray-600 mb-8">Continue your learning journey</p>

      {enrollments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-2">You haven't enrolled in any courses yet</p>
          <p className="text-gray-400 mb-4">Start exploring and enroll in your first course!</p>
          <Link to="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;
            const progress = getProgress(course._id);
            const isCompleted = progress === 100;
            
            return (
              <div key={enrollment.enrollmentId} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full md:w-48 h-40 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                          {isCompleted && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                              <FiAward size={12} className="mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FiClock size={14} className="mr-1" />
                            {course.duration} hours
                          </span>
                          <span className="flex items-center">
                            <FiPlayCircle size={14} className="mr-1" />
                            {course.totalLessons || course.lessons?.length || 0} lessons
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <ProgressBar progress={progress} />
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">
                          {progress}% complete
                        </span>
                        <Link 
                          to={`/course/${course._id}`}
                          className="btn-primary text-sm py-2 px-4"
                        >
                          {isCompleted ? 'Review Course' : 'Continue Learning'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;