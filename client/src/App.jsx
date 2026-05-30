import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import EnrolledCourses from './pages/EnrolledCourses';
import ProgressTracking from './pages/ProgressTracking';
import CoursePlayer from './pages/CoursePlayer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/courses" element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              } />
              <Route path="/course/:id" element={
                <PrivateRoute>
                  <CourseDetail />
                </PrivateRoute>
              } />
              <Route path="/course/:id/play/:lessonIndex" element={
                <PrivateRoute>
                  <CoursePlayer />
                </PrivateRoute>
              } />
              <Route path="/my-courses" element={
                <PrivateRoute>
                  <EnrolledCourses />
                </PrivateRoute>
              } />
              <Route path="/progress" element={
                <PrivateRoute>
                  <ProgressTracking />
                </PrivateRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;