import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { courseService } from '../services/courseService';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await courseService.getCategories();
      setCategories(res.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedLevel) params.level = selectedLevel;
      
      const res = await courseService.getAllCourses(params);
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) {
        searchCourses();
      } else {
        fetchCourses();
      }
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const searchCourses = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await courseService.searchCourses(searchTerm);
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error('Error searching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    fetchCourses();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLevel('');
    fetchCourses();
  };

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Courses</h1>
        <p className="text-gray-600">Discover courses that match your interests and career goals</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses by title, topic, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2 md:w-auto"
          >
            <FiFilter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="input-field"
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button onClick={applyFilters} className="btn-primary">Apply Filters</button>
              <button onClick={clearFilters} className="btn-secondary">Clear All</button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{courses.length}</span> courses
        </p>
        {(selectedCategory || selectedLevel) && (
          <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
            Clear Filters
          </button>
        )}
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-2">No courses found</p>
          <p className="text-gray-400">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default Courses;