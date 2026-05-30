import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import CourseCard from '../components/CourseCard';
import RecommendedCourses from '../components/RecommendedCourses';
import ProgressBar from '../components/ProgressBar';
import { FiBookOpen, FiTrendingUp, FiAward, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [enrolledRes, featuredRes] = await Promise.all([
        enrollmentService.getMyEnrolledCourses(),
        courseService.getFeaturedCourses()
      ]);

      const enrolled = enrolledRes.data.courses || [];
      setEnrolledCourses(enrolled.slice(0, 3));
      setFeaturedCourses(featuredRes.data.courses || []);

      // Calculate stats
      const completed = enrolled.filter(c => c.status === 'completed').length;
      const totalHours = enrolled.reduce((acc, c) => acc + (c.course?.duration || 0), 0);
      const avgProgress = enrolled.length > 0 
        ? Math.round(enrolled.reduce((acc, c) => acc + (c.progress?.overallProgress || 0), 0) / enrolled.length)
        : 0;

      setStats({
        totalCourses: enrolled.length,
        completedCourses: completed,
        totalHours: totalHours,
        averageProgress: avgProgress
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const greetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {greetings()}, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-primary-100">
          Continue your learning journey. You're doing great!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Enrolled</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
            </div>
            <FiBookOpen className="text-primary-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{stats.completedCourses}</p>
            </div>
            <FiAward className="text-green-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Hours Spent</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHours}</p>
            </div>
            <FiClock className="text-blue-600" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-800">{stats.averageProgress}%</p>
            </div>
            <FiTrendingUp className="text-purple-600" size={28} />
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      {enrolledCourses.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
            <Link to="/my-courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => (
              <div key={enrollment.course?._id} className="card">
                <img 
                  src={enrollment.course?.thumbnail} 
                  alt={enrollment.course?.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {enrollment.course?.title}
                  </h3>
                  <ProgressBar progress={enrollment.progress?.overallProgress || 0} />
                  <Link 
                    to={`/course/${enrollment.course?._id}`}
                    className="mt-3 btn-primary w-full text-center inline-block"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Recommendations */}
      <RecommendedCourses title="📚 Recommended For You" endpoint="/recommendations" />

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">⭐ Featured Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.slice(0, 4).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;