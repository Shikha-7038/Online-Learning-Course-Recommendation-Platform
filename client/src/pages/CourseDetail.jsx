import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { progressService } from '../services/progressService';
import RecommendedCourses from '../components/RecommendedCourses';
import ProgressBar from '../components/ProgressBar';
import { FiClock, FiUsers, FiStar, FiBookOpen, FiCheckCircle, FiPlayCircle } from 'react-icons/fi';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
    checkEnrollment();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const res = await courseService.getCourseById(id);
      setCourse(res.data.course);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const res = await enrollmentService.checkEnrollment(id);
      setIsEnrolled(res.data.isEnrolled);
      
      if (res.data.isEnrolled) {
        const progressRes = await progressService.getCourseProgress(id);
        setCourseProgress(progressRes.data.progress);
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollmentService.enrollInCourse(id);
      await progressService.initProgress(id);
      setIsEnrolled(true);
      alert('Successfully enrolled in the course!');
      navigate(`/course/${id}/play/0`);
    } catch (error) {
      console.error('Error enrolling:', error);
      alert(error.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const handleContinue = () => {
    navigate(`/course/${id}/play/0`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.category}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.level}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-primary-100 mb-4">{course.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <FiUsers size={16} />
                <span>{course.totalEnrollments || 0} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiClock size={16} />
                <span>{course.duration || 0} hours</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiBookOpen size={16} />
                <span>{course.totalLessons || course.lessons?.length || 0} lessons</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiStar size={16} />
                <span>{course.rating || 'New'} rating</span>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              {isEnrolled ? (
                <button onClick={handleContinue} className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Continue Learning
                </button>
              ) : (
                <button 
                  onClick={handleEnroll} 
                  disabled={enrolling}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
                >
                  {enrolling ? 'Enrolling...' : course.price === 0 ? 'Enroll Now - Free' : `Enroll Now - $${course.price}`}
                </button>
              )}
            </div>
          </div>
          <div className="md:w-80">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* What You'll Learn */}
          {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Course Content / Curriculum */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="space-y-3">
              {course.lessons?.map((lesson, idx) => (
                <div key={lesson._id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FiPlayCircle className="text-primary-600" size={20} />
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-xs text-gray-500">{lesson.duration} min</p>
                    </div>
                  </div>
                  {isEnrolled && (
                    <button 
                      onClick={() => navigate(`/course/${id}/play/${idx}`)}
                      className="text-primary-600 text-sm hover:underline"
                    >
                      Preview
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Instructor</h2>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">
                  {course.instructor?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{course.instructor}</h3>
                <p className="text-gray-600 text-sm mt-1">{course.instructorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress (if enrolled) */}
          {isEnrolled && courseProgress && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-semibold mb-3">Your Progress</h3>
              <ProgressBar progress={courseProgress.overallProgress || 0} />
              <button onClick={handleContinue} className="btn-primary w-full mt-4">
                Continue Course
              </button>
            </div>
          )}

          {/* Skills You'll Learn */}
          {course.skillsTaught && course.skillsTaught.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-semibold mb-3">Skills You'll Gain</h3>
              <div className="flex flex-wrap gap-2">
                {course.skillsTaught.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {course.requirements && course.requirements.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {course.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Similar Courses Recommendations */}
      <RecommendedCourses title="🔗 Similar Courses" endpoint={`/recommendations/similar/${id}`} />
    </div>
  );
};

export default CourseDetail;