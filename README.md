# 🎓 Online Learning & Course Recommendation Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![MERN](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-orange)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [How to Use](#how-to-use)
- [Recommendation Logic](#recommendation-logic)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Project Overview

The **Online Learning & Course Recommendation Platform** is a full-stack EdTech application that allows students to browse courses, enroll in courses, track their learning progress, and receive personalized course recommendations based on their interests and skills.

### Problem It Solves
- ❌ Learners get confused about which course to take next
- ❌ No personalized learning path
- ❌ Difficulty tracking learning progress
- ❌ No course recommendations based on interests

### Our Solution
- ✅ Personalized course recommendations
- ✅ Progress tracking for each enrolled course
- ✅ Interactive course player with lessons
- ✅ Dashboard showing learning statistics

## ✨ Features

### For Students
- 🔐 **Authentication**: JWT-based secure login/register
- 📚 **Course Catalog**: Browse courses by category, level, and search
- 🎯 **Personalized Recommendations**: Course suggestions based on interests
- 📖 **Course Player**: Interactive video lessons with progress tracking
- 📊 **Progress Tracking**: Track lesson completion and overall progress
- 📈 **Dashboard**: View enrolled courses, recommendations, and statistics
- 💰 **Indian Pricing**: Affordable courses in INR (₹349 - ₹599)

### Technical Features
- 🔒 JWT Authentication & Authorization
- 🗄️ MongoDB Atlas Database
- 🎨 Responsive Design with Tailwind CSS
- 📱 Mobile-Friendly Interface
- 🔄 RESTful API Architecture
- 🌐 CORS enabled for cross-origin requests

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI Library |
| Vite | 5.0.0 | Build Tool |
| Tailwind CSS | 3.3.5 | Styling |
| React Router DOM | 6.18.0 | Routing |
| Axios | 1.6.0 | API Calls |
| React Icons | 4.11.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express.js | 4.18.2 | Web Framework |
| MongoDB | 6.x | Database |
| Mongoose | 7.5.0 | ODM |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |

### Development Tools
| Tool | Purpose |
|------|---------|
| Nodemon | Auto-restart server |
| ESLint | Code linting |
| Postman | API Testing |

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────────┐
│ Client (React) │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ Login/ │ │ Course │ │ Course │ │Progress │ │
│ │Register │ │ Browser │ │ Player │ │Tracking │ │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
└───────────────────────────┬─────────────────────────────────┘
│ HTTP/REST API
▼
┌─────────────────────────────────────────────────────────────┐
│ Backend (Node.js/Express) │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ Auth │ │ Course │ │Enroll- │ │Recommend│ │
│ │ Routes │ │ Routes │ │ ment │ │ ation │ │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
└───────────────────────────┬─────────────────────────────────┘
│ Mongoose ODM
▼
┌─────────────────────────────────────────────────────────────┐
│ MongoDB Atlas │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ Users │ │ Courses │ │Enroll- │ │Progress │ │
│ │ │ │ │ │ ments │ │ │ │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```
// User Collection
{
  name: String,
  email: String (unique),
  password: String (hashed),
  interests: [String],
  skills: [String],
  learningGoal: String
}

// Course Collection
{
  title: String,
  description: String,
  category: String,
  level: String,
  price: Number,
  duration: Number,
  lessons: [LessonSchema],
  instructor: String,
  rating: Number
}

// Enrollment Collection
{
  user: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  status: String,
  enrolledAt: Date
}

// Progress Collection
{
  user: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  enrollment: ObjectId (ref: Enrollment),
  overallProgress: Number,
  totalTimeSpent: Number,
  lessonProgress: [LessonProgressSchema]
}
```

## 📦 Installation Guide
Prerequisites
 - Node.js (v18 or higher)
 - MongoDB Atlas Account (or local MongoDB)

Git

**Step 1: Clone the Repository**
 - git clone https://github.com/yourusername/online-learning-platform.git
 - cd online-learning-platform

**Step 2: Backend Setup**
Navigate to server folder
 - cd server

Install dependencies
 - npm install

Create .env file (see environment variables section)
Start the server
 - npm run dev

**Step 3: Frontend Setup**
Open new terminal, navigate to client folder
 - cd client

Install dependencies
 - npm install

Start the frontend
 - npm run dev

**Step 4: Access the Application**
 - Frontend: http://localhost:5173
 - Backend API: http://localhost:5000/api
 - Health Check: http://localhost:5000/api/health

## 🔐 Environment Variables
 - Backend (.env in server folder)
 - env
Server Configuration
 - PORT=5000
 - NODE_ENV=development
MongoDB Connection
 - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning_platform_db
JWT Configuration
 - JWT_SECRET=your_super_secret_jwt_key
 - JWT_EXPIRE=7d

Frontend URL
 - CLIENT_URL=http://localhost:5173
 - Frontend (.env in client folder)
env
 - VITE_API_URL=http://localhost:5000/api

## 📁 Project Structure
```
online-learning-platform/
│
├── client/                          # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── RecommendedCourses.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── CoursePlayer.jsx
│   │   │   ├── EnrolledCourses.jsx
│   │   │   └── ProgressTracking.jsx
│   │   ├── services/               # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── courseService.js
│   │   │   ├── enrollmentService.js
│   │   │   └── progressService.js
│   │   ├── context/                # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/                  # Utilities
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend (Node.js + Express)
│   ├── models/                      # Mongoose models
│   │   ├── User.model.js
│   │   ├── Course.model.js
│   │   ├── Enrollment.model.js
│   │   └── Progress.model.js
│   ├── routes/                      # API routes
│   │   ├── auth.routes.js
│   │   ├── course.routes.js
│   │   ├── enrollment.routes.js
│   │   ├── progress.routes.js
│   │   └── recommendation.routes.js
│   ├── controllers/                 # Business logic
│   │   ├── auth.controller.js
│   │   ├── course.controller.js
│   │   ├── enrollment.controller.js
│   │   ├── progress.controller.js
│   │   └── recommendation.controller.js
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── config/                      # Configuration
│   │   └── db.config.js
│   ├── utils/                       # Utilities
│   │   └── recommendationEngine.js
│   ├── data/                        # Sample data
│   │   └── sampleCourses.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── docs/                            # Documentation
│   └── screenshots/
│
├── README.md
└── .gitignore
```

## 🎯 How to Use
1. Register a New Account
 - Go to Register page
 - Enter name, email, password
 - Select your interests (Web Development, Data Science, etc.)
 - Click "Sign Up"

2. Login
 - Use your email and password
 - Click "Sign In"

3. Browse Courses
 - Click "Browse Courses" in navbar
 - Search or filter by category/level
 - Click on any course to view details

4. Enroll in a Course
 - Click "Enroll Now" on course detail page
 - Course will appear in "My Courses"

5. Start Learning
 - Go to "My Courses"
 - Click "Continue Learning"
 - Watch lessons and mark them complete
 - Track your progress

6. Get Recommendations
 - Dashboard shows personalized recommendations
 - Based on your interests and enrolled courses

## 🔮 Future Enhancements
 - Video streaming with AWS S3
 - Payment gateway integration (Razorpay)
 - Live classes and webinars
 - Discussion forums
 - Certificates on course completion
 - Quizzes and assessments
 - Instructor dashboard
 - Admin panel
 - Mobile app (React Native)
 - Email notifications
 - Social login (Google, GitHub)
 - Course reviews and ratings
 - Wishlist feature
 - Downloadable resources

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
 - Fork the repository
 - Create a feature branch (git checkout -b feature/AmazingFeature)
 - Commit changes (git commit -m 'Add some AmazingFeature')
 - Push to branch (git push origin feature/AmazingFeature)
 - Open a Pull Request

## 📝 License
 - This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
 - MongoDB Atlas for free database hosting
 - Unsplash for course thumbnails
 - FreeCodeCamp and Traversy Media for educational content
 - All open-source contributors

⚠️ Disclaimer
 - This project is for educational purposes only as part of a course project.
 - All video content used belongs to their respective owners
 - This application is not deployed publicly
 - No copyright infringement is intended

## 🚀 Quick Start Commands

Clone repository
 - git clone https://github.com/yourusername/online-learning-platform.git

Backend
 - cd server
 - npm install
 - npm run dev

Frontend (new terminal)
 - cd client
 - npm install
 - npm run dev

Open browser
 - http://localhost:5173

⭐ Star this repository if you found it helpful!