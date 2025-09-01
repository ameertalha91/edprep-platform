import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'CSS Prep Platform API', 
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development'
  });
});

// AI Chat endpoint placeholder
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  res.json({
    response: `Thanks for asking: "${message}". AI integration coming soon!`,
    timestamp: new Date().toISOString()
  });
});

// Courses endpoint with sample data
app.get('/api/courses', (req, res) => {
  res.json({
    courses: [
      {
        id: 1,
        title: 'CSS Essay Writing Masterclass',
        description: 'Complete guide to CSS essay writing techniques and strategies',
        instructor: 'Prof. Ahmad Khan',
        modules: 12,
        duration: '8 weeks',
        level: 'Intermediate'
      },
      {
        id: 2,
        title: 'Current Affairs for CSS 2025',
        description: 'Latest current affairs, analysis, and practice questions',
        instructor: 'Dr. Sarah Ahmed',
        modules: 8,
        duration: '6 weeks',
        level: 'Beginner'
      },
      {
        id: 3,
        title: 'CSS Interview Preparation',
        description: 'Mock interviews, personality development, and communication skills',
        instructor: 'Mr. Hassan Ali',
        modules: 6,
        duration: '4 weeks',
        level: 'Advanced'
      }
    ]
  });
});

// User routes placeholder
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: 'Login endpoint - authentication coming soon',
    user: { email, role: 'student' }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, role } = req.body;
  res.json({
    message: 'Registration endpoint - user creation coming soon',
    user: { email, role }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CSS Prep Platform API running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 Courses: http://localhost:${PORT}/api/courses`);
});