import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { progressService } from '../services/progressService';
import { FiCheckCircle, FiClock, FiTrendingUp, FiAward } from 'react-icons/fi';

const ProgressTracking = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    averageProgress: 0,
    totalHoursSpent: 0
  });

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await progressService.getMyProgress();
      console.log('API Response:', res.data); // Debug: Check what backend sends
      
      const data = res.data.progress || [];
      setProgressData(data);
      
      // Calculate stats - FIXED: backend already sends totalHoursSpent
      const completed = data.filter(p => p.isCompleted).length;
      const avgProgress = data.length > 0 
        ? Math.round(data.reduce((acc, p) => acc + (p.overallProgress || 0), 0) / data.length)
        : 0;
      
      // FIXED: Use stats from backend or calculate from totalTimeSpent (which is already in hours)
      let totalHours = 0;
      if (res.data.stats && res.data.stats.totalHoursSpent !== undefined) {
        totalHours = res.data.stats.totalHoursSpent;
      } else {
        // Fallback: totalTimeSpent from backend is already in hours
        totalHours = data.reduce((acc, p) => acc + (p.totalTimeSpent || 0), 0);
      }
      
      setStats({
        totalCourses: data.length,
        completedCourses: completed,
        averageProgress: avgProgress,
        totalHoursSpent: totalHours
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper function to format time display
  const formatTimeSpent = (totalTimeSpent) => {
    // Backend sends totalTimeSpent in hours (already divided by 60)
    // So we just need to show hours and minutes from that
    const hours = Math.floor(totalTimeSpent || 0);
    const minutes = Math.round(((totalTimeSpent || 0) - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Progress</h1>
      <p className="text-gray-600 mb-8">Track your learning journey and achievements</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Courses</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
            </div>
            <FiTrendingUp className="text-primary-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{stats.completedCourses}</p>
            </div>
            <FiAward className="text-green-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-800">{stats.averageProgress}%</p>
            </div>
            <FiCheckCircle className="text-blue-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Hours Spent</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHoursSpent}</p>
            </div>
            <FiClock className="text-purple-600" size={28} />
          </div>
        </div>
      </div>

      {/* Progress List */}
      {progressData.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-2">No progress data available</p>
          <p className="text-gray-400">Enroll in a course to start tracking your progress</p>
          <Link to="/courses" className="btn-primary mt-4 inline-block">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {progressData.map((progress) => (
            <div key={progress._id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {progress.course?.title || 'Course'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Last activity: {progress.lastActivityAt ? new Date(progress.lastActivityAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                {progress.isCompleted && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Completed ✓
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progress.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`${getProgressColor(progress.overallProgress)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${progress.overallProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Lessons completed: {progress.lessonProgress?.filter(l => l.completed).length || 0} / {progress.lessonProgress?.length || 0}</span>
                {/* FIXED: totalTimeSpent from backend is already in hours, don't divide again */}
                <span>Time spent: {formatTimeSpent(progress.totalTimeSpent)}</span>
              </div>
              
              <Link 
                to={`/course/${progress.course?._id}`}
                className="btn-primary text-sm py-2 px-4 inline-block"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressTracking;