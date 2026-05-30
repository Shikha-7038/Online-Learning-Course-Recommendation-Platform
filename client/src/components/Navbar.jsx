import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiBookOpen, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <FiBookOpen size={20} />
              </div>
              <span className="font-bold text-xl text-gray-800">EduLearn</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition">
              <FiHome size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/courses" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition">
              <FiBookOpen size={18} />
              <span>Browse Courses</span>
            </Link>
            <Link to="/my-courses" className="text-gray-600 hover:text-primary-600 transition">
              My Courses
            </Link>
            <Link to="/progress" className="text-gray-600 hover:text-primary-600 transition">
              Progress
            </Link>
            
            <div className="border-l pl-6 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-primary-600" size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/dashboard" onClick={toggleMenu} className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                <FiHome size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/courses" onClick={toggleMenu} className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                <FiBookOpen size={18} />
                <span>Browse Courses</span>
              </Link>
              <Link to="/my-courses" onClick={toggleMenu} className="text-gray-600 hover:text-primary-600">
                My Courses
              </Link>
              <Link to="/progress" onClick={toggleMenu} className="text-gray-600 hover:text-primary-600">
                Progress
              </Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="flex items-center space-x-2 text-red-600 text-left">
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;