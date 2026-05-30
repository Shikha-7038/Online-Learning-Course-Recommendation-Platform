// data/sampleCourses.js - Complete sample course data with safe video URLs
// All videos are from FreeCodeCamp, Traversy Media, and other open educational content
// For educational project use only

const sampleCourses = [
    // ========== WEB DEVELOPMENT COURSES ==========
    {
        title: "Complete Web Development Bootcamp",
        subtitle: "Learn HTML, CSS, JavaScript, React & Node.js - Build Real Projects",
        description: "Start your web development journey from scratch. Learn modern web technologies, build responsive websites, and create full-stack applications. Perfect for beginners who want to become professional web developers.",
        category: "Web Development",
        level: "Beginner",
        tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
        skillsTaught: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js"],
        prerequisites: ["No coding experience needed", "Computer with internet"],
        instructor: "Dr. Angela Yu",
        instructorBio: "Lead Developer with 10+ years experience, 500,000+ students worldwide.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
        price: 499,
        duration: 12,
        whatYouWillLearn: [
            "Build 5+ real-world web projects",
            "Master frontend development with React",
            "Create backend APIs with Node.js",
            "Deploy websites to production",
            "Understand responsive design"
        ],
        requirements: [
            "No programming experience needed",
            "A computer with internet connection"
        ],
        lessons: [
            {
                title: "Introduction to Web Development",
                description: "Understand how websites work and set up your environment",
                videoUrl: "https://www.youtube.com/embed/6mbwJ2xhgzM",
                duration: 30,
                order: 1,
                isFree: true
            },
            {
                title: "HTML5 Crash Course",
                description: "Learn HTML in 1 hour - Complete tutorial",
                videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
                duration: 60,
                order: 2,
                isFree: true
            },
            {
                title: "CSS3 Mastery - Full Course",
                description: "Make beautiful websites with CSS3 including Flexbox and Grid",
                videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc",
                duration: 90,
                order: 3,
                isFree: false
            },
            {
                title: "JavaScript Fundamentals - Full Course",
                description: "Add interactivity to your websites with JavaScript",
                videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
                duration: 120,
                order: 4,
                isFree: false
            },
            {
                title: "React.js Tutorial for Beginners",
                description: "Build modern UIs with React.js",
                videoUrl: "https://www.youtube.com/embed/RVFAyFWO4go",
                duration: 120,
                order: 5,
                isFree: false
            },
            {
                title: "Node.js and Express.js Tutorial",
                description: "Build backend servers with Node.js",
                videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
                duration: 90,
                order: 6,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.8,
        totalEnrollments: 12500,
        language: "Hindi & English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 1250,
        currency: "INR"
    },
    {
        title: "React.js Masterclass",
        subtitle: "Master React Hooks, Context API, and Redux Toolkit",
        description: "Learn React from basics to advanced. Build real-world applications using modern React patterns including Hooks, Context API, and Redux for state management.",
        category: "Web Development",
        level: "Intermediate",
        tags: ["React", "Hooks", "Redux", "JavaScript"],
        skillsTaught: ["React.js", "React Hooks", "Redux Toolkit", "Context API"],
        prerequisites: ["JavaScript basics", "HTML/CSS knowledge"],
        instructor: "Maximilian Schwarzmüller",
        instructorBio: "Acclaimed instructor with 1M+ students worldwide.",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
        price: 399,
        duration: 8,
        whatYouWillLearn: [
            "Build React applications from scratch",
            "Master React Hooks (useState, useEffect)",
            "Manage state with Redux Toolkit",
            "Create reusable components"
        ],
        requirements: [
            "Basic JavaScript knowledge",
            "Familiarity with HTML/CSS"
        ],
        lessons: [
            {
                title: "React Fundamentals - Components, Props, State",
                description: "Learn the basics of React",
                videoUrl: "https://www.youtube.com/embed/RVFAyFWO4go",
                duration: 60,
                order: 1,
                isFree: true
            },
            {
                title: "React Hooks Deep Dive",
                description: "useState, useEffect, useContext explained",
                videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q",
                duration: 90,
                order: 2,
                isFree: true
            },
            {
                title: "State Management with Redux",
                description: "Learn Redux Toolkit for state management",
                videoUrl: "https://www.youtube.com/embed/9boMnm5X9ak",
                duration: 120,
                order: 3,
                isFree: false
            },
            {
                title: "Building Real Projects with React",
                description: "Create a complete e-commerce application",
                videoUrl: "https://www.youtube.com/embed/iZhV0bILFb0",
                duration: 120,
                order: 4,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.9,
        totalEnrollments: 8900,
        language: "English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 890,
        currency: "INR"
    },

    // ========== DATA SCIENCE COURSES ==========
    {
        title: "Python for Data Science",
        subtitle: "Learn Python, Pandas, NumPy & Data Visualization in 10 Hours",
        description: "Kickstart your data science career with Python. Learn to analyze data, create visualizations, and build basic machine learning models. Perfect for beginners who want to enter the data science field.",
        category: "Data Science",
        level: "Beginner",
        tags: ["Python", "Pandas", "NumPy", "Data Science"],
        skillsTaught: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
        prerequisites: ["Basic computer knowledge"],
        instructor: "Jose Portilla",
        instructorBio: "Head of Data Science at Pierian Data, 2M+ students.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        price: 449,
        duration: 10,
        whatYouWillLearn: [
            "Master Python programming",
            "Analyze data with Pandas",
            "Create stunning visualizations",
            "Build basic ML models"
        ],
        requirements: [
            "Computer with internet access",
            "Willingness to learn"
        ],
        lessons: [
            {
                title: "Python Basics - Full Course",
                description: "Variables, loops, functions, and more",
                videoUrl: "https://www.youtube.com/embed/eWRfhZUzrAc",
                duration: 90,
                order: 1,
                isFree: true
            },
            {
                title: "NumPy Tutorial - Numerical Computing",
                description: "Learn NumPy arrays and operations",
                videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI",
                duration: 60,
                order: 2,
                isFree: true
            },
            {
                title: "Pandas for Data Analysis",
                description: "Data manipulation masterclass",
                videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
                duration: 120,
                order: 3,
                isFree: false
            },
            {
                title: "Data Visualization with Matplotlib & Seaborn",
                description: "Create beautiful charts and plots",
                videoUrl: "https://www.youtube.com/embed/3Xc3CA655Y4",
                duration: 90,
                order: 4,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.7,
        totalEnrollments: 7500,
        language: "Hindi & English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 750,
        currency: "INR"
    },
    {
        title: "Machine Learning Basics",
        subtitle: "Learn ML Algorithms - Regression, Classification & Clustering",
        description: "Start your machine learning journey. Understand core ML algorithms, build predictive models, and work on real-world datasets. No advanced math required!",
        category: "Data Science",
        level: "Intermediate",
        tags: ["Machine Learning", "Python", "Scikit-Learn"],
        skillsTaught: ["Machine Learning", "Regression", "Classification", "Clustering"],
        prerequisites: ["Basic Python knowledge"],
        instructor: "Kirill Eremenko",
        instructorBio: "Data Scientist and Kaggle Master.",
        thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
        price: 549,
        duration: 8,
        whatYouWillLearn: [
            "Understand ML algorithms",
            "Build regression models",
            "Classification techniques",
            "Clustering algorithms"
        ],
        requirements: [
            "Python basics",
            "Basic math knowledge"
        ],
        lessons: [
            {
                title: "Machine Learning Overview",
                description: "What is Machine Learning? Types of ML",
                videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ",
                duration: 30,
                order: 1,
                isFree: true
            },
            {
                title: "Linear Regression Tutorial",
                description: "Predict continuous values with regression",
                videoUrl: "https://www.youtube.com/embed/7ArmBVF2dCs",
                duration: 60,
                order: 2,
                isFree: false
            },
            {
                title: "Classification Algorithms",
                description: "Logistic Regression, Decision Trees, SVM",
                videoUrl: "https://www.youtube.com/embed/7FjmWE8Py0k",
                duration: 90,
                order: 3,
                isFree: false
            },
            {
                title: "Clustering Algorithms",
                description: "K-Means and Hierarchical Clustering",
                videoUrl: "https://www.youtube.com/embed/EItlUEPCIzM",
                duration: 60,
                order: 4,
                isFree: false
            }
        ],
        featured: false,
        rating: 4.8,
        totalEnrollments: 6200,
        language: "English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 620,
        currency: "INR"
    },

    // ========== AI & DEEP LEARNING COURSES ==========
    {
        title: "Deep Learning Crash Course",
        subtitle: "Neural Networks, CNNs & RNNs - Build AI Models",
        description: "Learn deep learning fundamentals in just 6 hours. Build neural networks, understand CNNs for image recognition, and RNNs for sequence data. Perfect for AI enthusiasts!",
        category: "AI/ML",
        level: "Advanced",
        tags: ["Deep Learning", "Neural Networks", "TensorFlow"],
        skillsTaught: ["TensorFlow", "Neural Networks", "CNNs", "RNNs"],
        prerequisites: ["Python programming", "ML basics"],
        instructor: "Andrew Ng",
        instructorBio: "Co-founder of Coursera, former Google Brain lead.",
        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400",
        price: 599,
        duration: 6,
        whatYouWillLearn: [
            "Build neural networks",
            "Understand CNNs for images",
            "Use RNNs for sequences",
            "Deploy AI models"
        ],
        requirements: [
            "Python skills",
            "ML basics understanding"
        ],
        lessons: [
            {
                title: "Neural Networks Basics",
                description: "Perceptrons, activation functions, backpropagation",
                videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
                duration: 60,
                order: 1,
                isFree: true
            },
            {
                title: "Convolutional Neural Networks (CNNs)",
                description: "CNNs for image recognition",
                videoUrl: "https://www.youtube.com/embed/Hy-8p2Avcvg",
                duration: 90,
                order: 2,
                isFree: false
            },
            {
                title: "Recurrent Neural Networks (RNNs)",
                description: "RNNs for sequence data and time series",
                videoUrl: "https://www.youtube.com/embed/6niqTuYFZLQ",
                duration: 90,
                order: 3,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.9,
        totalEnrollments: 4800,
        language: "English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 480,
        currency: "INR"
    },

    // ========== CYBERSECURITY COURSES ==========
    {
        title: "Cybersecurity for Beginners",
        subtitle: "Protect Networks, Detect Threats & Secure Systems",
        description: "Start your cybersecurity career. Learn about network security, ethical hacking basics, threat detection, and how to protect systems from attacks. No prior security experience needed.",
        category: "Cybersecurity",
        level: "Beginner",
        tags: ["Security", "Network Security", "Ethical Hacking"],
        skillsTaught: ["Network Security", "Cryptography", "Threat Detection"],
        prerequisites: ["Basic computer knowledge"],
        instructor: "Brian Krebs",
        instructorBio: "Cybersecurity expert and investigative journalist.",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
        price: 399,
        duration: 5,
        whatYouWillLearn: [
            "Understand cybersecurity threats",
            "Implement security measures",
            "Learn cryptography basics",
            "Detect security incidents"
        ],
        requirements: [
            "Basic computer literacy",
            "Interest in security"
        ],
        lessons: [
            {
                title: "Security Fundamentals",
                description: "What is cybersecurity? Types of threats",
                videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA",
                duration: 30,
                order: 1,
                isFree: true
            },
            {
                title: "Network Security Basics",
                description: "Firewalls, IDS/IPS, secure network design",
                videoUrl: "https://www.youtube.com/embed/6JwEYayjH3k",
                duration: 60,
                order: 2,
                isFree: false
            },
            {
                title: "Cryptography Fundamentals",
                description: "Encryption, decryption, and secure communication",
                videoUrl: "https://www.youtube.com/embed/jrjpI_lZ2C4",
                duration: 60,
                order: 3,
                isFree: false
            }
        ],
        featured: false,
        rating: 4.6,
        totalEnrollments: 3400,
        language: "Hindi & English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 340,
        currency: "INR"
    },

    // ========== CLOUD COMPUTING COURSES ==========
    {
        title: "AWS Cloud Computing Basics",
        subtitle: "Learn EC2, S3, Lambda & More - Prepare for Certification",
        description: "Master AWS fundamentals. Learn about cloud computing, EC2 virtual servers, S3 storage, and serverless Lambda functions. Perfect for beginners starting their cloud journey.",
        category: "Cloud Computing",
        level: "Beginner",
        tags: ["AWS", "Cloud", "EC2", "S3"],
        skillsTaught: ["AWS EC2", "AWS S3", "Lambda", "IAM"],
        prerequisites: ["Basic IT knowledge"],
        instructor: "Stephane Maarek",
        instructorBio: "AWS Certified Solutions Architect, 500,000+ students.",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
        price: 499,
        duration: 7,
        whatYouWillLearn: [
            "Understand cloud computing",
            "Use EC2 virtual servers",
            "Store data with S3",
            "Create serverless functions"
        ],
        requirements: [
            "Basic computer knowledge",
            "Interest in cloud"
        ],
        lessons: [
            {
                title: "Cloud Computing Overview",
                description: "What is cloud computing? AWS Global Infrastructure",
                videoUrl: "https://www.youtube.com/embed/ulprqHHWlng",
                duration: 30,
                order: 1,
                isFree: true
            },
            {
                title: "EC2 Tutorial - Virtual Servers",
                description: "Launch and manage EC2 instances",
                videoUrl: "https://www.youtube.com/embed/TTsylCVA1E8",
                duration: 90,
                order: 2,
                isFree: false
            },
            {
                title: "S3 Storage - Object Storage",
                description: "Store and retrieve data with S3",
                videoUrl: "https://www.youtube.com/embed/77lMCiiMilo",
                duration: 60,
                order: 3,
                isFree: false
            },
            {
                title: "AWS Lambda - Serverless Computing",
                description: "Run code without servers",
                videoUrl: "https://www.youtube.com/embed/EBSdyoO3goc",
                duration: 60,
                order: 4,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.8,
        totalEnrollments: 5600,
        language: "English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 560,
        currency: "INR"
    },

    // ========== MOBILE DEVELOPMENT COURSES ==========
    {
        title: "React Native - Build Mobile Apps",
        subtitle: "Create iOS & Android Apps with One Codebase",
        description: "Learn to build cross-platform mobile apps using React Native. Build real apps that work on both iOS and Android. Perfect for web developers wanting to enter mobile development.",
        category: "Mobile Development",
        level: "Intermediate",
        tags: ["React Native", "Mobile", "iOS", "Android"],
        skillsTaught: ["React Native", "Expo", "Mobile UI", "API Integration"],
        prerequisites: ["JavaScript basics", "React knowledge"],
        instructor: "Stephen Grider",
        instructorBio: "Senior Engineer with 500,000+ students.",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
        price: 449,
        duration: 8,
        whatYouWillLearn: [
            "Build cross-platform apps",
            "Create mobile UIs",
            "Integrate APIs",
            "Publish to app stores"
        ],
        requirements: [
            "JavaScript knowledge",
            "React basics"
        ],
        lessons: [
            {
                title: "React Native Setup",
                description: "Environment setup and first app",
                videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
                duration: 45,
                order: 1,
                isFree: true
            },
            {
                title: "Building UI Components",
                description: "Create beautiful mobile interfaces",
                videoUrl: "https://www.youtube.com/embed/qSRrxpdMpVc",
                duration: 90,
                order: 2,
                isFree: false
            },
            {
                title: "Navigation & APIs",
                description: "Screen navigation and API integration",
                videoUrl: "https://www.youtube.com/embed/j8cD3ycgzUc",
                duration: 120,
                order: 3,
                isFree: false
            }
        ],
        featured: false,
        rating: 4.8,
        totalEnrollments: 4100,
        language: "English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 410,
        currency: "INR"
    },

    // ========== DEVOPS COURSES ==========
    {
        title: "Docker & Kubernetes Basics",
        subtitle: "Containerization & Orchestration for Beginners",
        description: "Learn Docker and Kubernetes in just 6 hours. Understand containerization, create Docker images, deploy containers, and manage them with Kubernetes.",
        category: "DevOps",
        level: "Beginner",
        tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
        skillsTaught: ["Docker", "Docker Compose", "Kubernetes Basics"],
        prerequisites: ["Linux basics", "Command line experience"],
        instructor: "Stephen Grider",
        instructorBio: "Senior Engineer and architect, 300,000+ students.",
        thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400",
        price: 399,
        duration: 6,
        whatYouWillLearn: [
            "Containerize applications",
            "Use Docker Compose",
            "Deploy with Kubernetes",
            "Manage containers"
        ],
        requirements: [
            "Basic command line knowledge",
            "Linux basics"
        ],
        lessons: [
            {
                title: "Docker Introduction",
                description: "What is containerization? Docker basics",
                videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE",
                duration: 30,
                order: 1,
                isFree: true
            },
            {
                title: "Docker Images & Containers",
                description: "Build and run Docker containers",
                videoUrl: "https://www.youtube.com/embed/17Bl31rlnRM",
                duration: 90,
                order: 2,
                isFree: false
            },
            {
                title: "Kubernetes Basics",
                description: "Container orchestration with K8s",
                videoUrl: "https://www.youtube.com/embed/X48VuDVv0do",
                duration: 90,
                order: 3,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.9,
        totalEnrollments: 3800,
        language: "English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 380,
        currency: "INR"
    },

    // ========== UI/UX DESIGN COURSE ==========
    {
        title: "UI/UX Design Fundamentals",
        subtitle: "Learn Figma, Wireframing, Prototyping & User Research",
        description: "Start your design career. Learn UI/UX principles, create wireframes and prototypes using Figma, conduct user research, and design beautiful interfaces.",
        category: "UI/UX Design",
        level: "Beginner",
        tags: ["UI Design", "UX Design", "Figma", "Prototyping"],
        skillsTaught: ["Figma", "Wireframing", "Prototyping", "User Research", "Visual Design"],
        prerequisites: ["No design experience needed"],
        instructor: "Sarah Johnson",
        instructorBio: "Senior Product Designer at Google, 100,000+ students.",
        thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400",
        price: 349,
        duration: 7,
        whatYouWillLearn: [
            "Master Figma design tool",
            "Create wireframes and prototypes",
            "Understand UX principles",
            "Build a design portfolio"
        ],
        requirements: [
            "Computer with internet",
            "Creativity and willingness to learn"
        ],
        lessons: [
            {
                title: "UI/UX Fundamentals",
                description: "What is UI/UX design? Design thinking",
                videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU",
                duration: 45,
                order: 1,
                isFree: true
            },
            {
                title: "Figma Masterclass",
                description: "Learn Figma from scratch",
                videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8",
                duration: 90,
                order: 2,
                isFree: true
            },
            {
                title: "Wireframing & Prototyping",
                description: "Create interactive prototypes",
                videoUrl: "https://www.youtube.com/embed/KRLL9G0Cqsc",
                duration: 90,
                order: 3,
                isFree: false
            },
            {
                title: "User Research Basics",
                description: "Understand your users and their needs",
                videoUrl: "https://www.youtube.com/embed/0eNR3vN8k2o",
                duration: 60,
                order: 4,
                isFree: false
            }
        ],
        featured: true,
        rating: 4.8,
        totalEnrollments: 5200,
        language: "Hindi & English",
        isPublished: true,
        lastUpdated: new Date(),
        totalRatings: 520,
        currency: "INR"
    }
];

module.exports = sampleCourses;