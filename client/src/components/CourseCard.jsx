import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiUsers } from 'react-icons/fi';

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <Link to={`/course/${course._id}`} className="block group">
      <div className="card transform transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative">
          <img 
            src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'} 
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          {course.featured && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary-600 font-semibold bg-primary-50 px-2 py-1 rounded-full">
              {course.category}
            </span>
            <span className="text-xs text-gray-500">{course.level}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition">
            {course.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FiStar className="text-yellow-400" size={14} />
              <span>{course.rating || 'New'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock size={14} />
              <span>{course.duration || 0} hrs</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiUsers size={14} />
              <span>{course.totalEnrollments || 0}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">By {course.instructor?.split(' ')[0]}</span>
              <span className="font-bold text-primary-600">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;