import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import { FiChevronLeft, FiChevronRight, FiCheckCircle, FiCircle } from 'react-icons/fi';

const CoursePlayer = () => {
  const { id, lessonIndex } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(parseInt(lessonIndex) || 0);
  const [lessonProgress, setLessonProgress] = useState({});
  const [courseProgress, setCourseProgress] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchCourseAndProgress();
  }, [id]);

  useEffect(() => {
    setCurrentLessonIndex(parseInt(lessonIndex) || 0);
  }, [lessonIndex]);

  const fetchCourseAndProgress = async () => {
    try {
      const [courseRes, progressRes] = await Promise.all([
        courseService.getCourseById(id),
        progressService.getCourseProgress(id)
      ]);
      
      setCourse(courseRes.data.course);
      
      if (progressRes.data.progress) {
        setCourseProgress(progressRes.data.progress);
        const progressMap = {};
        progressRes.data.progress.lessonProgress?.forEach(lp => {
          progressMap[lp.lessonId] = lp.completed;
        });
        setLessonProgress(progressMap);
      } else {
        // Initialize progress if not exists
        await progressService.initProgress(id);
        const newProgressRes = await progressService.getCourseProgress(id);
        if (newProgressRes.data.progress) {
          setCourseProgress(newProgressRes.data.progress);
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async () => {
    const currentLesson = course?.lessons[currentLessonIndex];
    if (!currentLesson) return;
    
    try {
      await progressService.completeLesson(id, currentLesson._id);
      setLessonProgress(prev => ({ ...prev, [currentLesson._id]: true }));
      
      // Refresh progress data
      const progressRes = await progressService.getCourseProgress(id);
      setCourseProgress(progressRes.data.progress);
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < (course?.lessons?.length || 0) - 1) {
      navigate(`/course/${id}/play/${currentLessonIndex + 1}`);
    } else {
      alert('Congratulations! You have completed all lessons!');
      navigate(`/course/${id}`);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      navigate(`/course/${id}/play/${currentLessonIndex - 1}`);
    }
  };

  const isLessonCompleted = (index) => {
    const lesson = course?.lessons[index];
    return lesson && lessonProgress[lesson._id];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!course || !course.lessons || course.lessons.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Course content not available</p>
        <Link to={`/course/${id}`} className="btn-primary mt-4 inline-block">
          Back to Course
        </Link>
      </div>
    );
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const isCurrentCompleted = isLessonCompleted(currentLessonIndex);
  const totalLessons = course.lessons.length;
  const completedCount = Object.values(lessonProgress).filter(v => v === true).length;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to={`/course/${id}`} className="flex items-center text-gray-300 hover:text-white">
            <FiChevronLeft size={20} />
            <span className="ml-1">Back to Course</span>
          </Link>
          <div className="text-sm">
            {completedCount} / {totalLessons} lessons completed
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Video Player Area */}
        <div className="lg:flex-1 bg-black">
          <div className="relative pt-[56.25%]">
            {currentLesson.videoUrl ? (
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center text-gray-400">
                  <p className="text-lg">Video Preview</p>
                  <p className="text-sm mt-2">Full video content available after enrollment</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Lesson List */}
        <div className="lg:w-96 bg-white border-l">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Course Content</h2>
            <p className="text-sm text-gray-500 mt-1">{totalLessons} lessons</p>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {course.lessons.map((lesson, idx) => (
              <button
                key={lesson._id || idx}
                onClick={() => navigate(`/course/${id}/play/${idx}`)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition border-b flex items-start space-x-3 ${
                  currentLessonIndex === idx ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                }`}
              >
                {isLessonCompleted(idx) ? (
                  <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                ) : (
                  <FiCircle className="text-gray-400 mt-0.5 flex-shrink-0" size={18} />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${currentLessonIndex === idx ? 'font-semibold text-primary-700' : 'text-gray-700'}`}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{lesson.duration} min</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-white border-t fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentLessonIndex === 0}
            className="flex items-center space-x-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-primary-600 transition"
          >
            <FiChevronLeft size={20} />
            <span>Previous</span>
          </button>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </span>
          </div>
          
          {!isCurrentCompleted ? (
            <button
              onClick={markLessonComplete}
              className="btn-primary flex items-center space-x-2"
            >
              <FiCheckCircle size={18} />
              <span>Mark as Complete</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>{currentLessonIndex === totalLessons - 1 ? 'Finish Course' : 'Next Lesson'}</span>
              <FiChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Add padding for bottom navbar */}
      <div className="h-16"></div>
    </div>
  );
};

export default CoursePlayer;