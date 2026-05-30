import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { FiRefreshCw } from 'react-icons/fi';

const RecommendedCourses = ({ title = "Recommended For You", endpoint = "/recommendations" }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, [endpoint]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data.recommendations || data.courses || []);
      } else {
        throw new Error('Failed to fetch recommendations');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Unable to load recommendations</p>
          <button onClick={fetchRecommendations} className="btn-outline flex items-center space-x-2 mx-auto">
            <FiRefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No recommendations available yet.</p>
          <p className="text-sm text-gray-400 mt-2">Start exploring courses to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;