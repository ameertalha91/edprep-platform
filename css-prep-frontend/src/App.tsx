import React, { useState, useEffect } from 'react';
import './App.css';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  modules: number;
  duration: string;
  level: string;
}

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses`);
      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatMessage })
      });
      const data = await response.json();
      setChatResponse(data.response);
      setChatMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setChatResponse('Sorry, there was an error processing your request.');
    } finally {
      setChatLoading(false);
    }
  };

  const handleLogin = (role: 'student' | 'instructor') => {
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">CSS Prep Platform</h1>
              <p className="text-blue-100 mt-1">AI-Powered CSS Exam Preparation for Pakistan</p>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                    {currentUser === 'student' ? '👨‍🎓 Student' : '👨‍🏫 Instructor'}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <button 
                    onClick={() => handleLogin('student')}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
                  >
                    Login as Student
                  </button>
                  <button 
                    onClick={() => handleLogin('instructor')}
                    className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded transition-colors"
                  >
                    Login as Instructor
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Welcome to CSS Prep Platform
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {currentUser === 'instructor' ? 
              'Manage your courses, track student progress, and create engaging content for CSS exam preparation.' :
              'Access comprehensive CSS exam preparation materials, practice with AI-powered study assistant, and track your learning progress.'
            }
          </p>
        </section>

        {/* Courses Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentUser === 'instructor' ? 'Your Courses' : 'Available Courses'}
            </h2>
            {currentUser === 'instructor' && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Create New Course
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-blue-600 leading-tight">
                      {course.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Instructor: {course.instructor}
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      {course.modules} modules • {course.duration}
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                    {currentUser === 'instructor' ? 'Edit Course' : 'Enroll Now'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* AI Chat Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🤖 AI Study Assistant
          </h2>
          <p className="text-gray-600 mb-4">
            Ask questions about CSS exam preparation, current affairs, essay writing, or any topic you need help with.
          </p>
          
          <form onSubmit={handleChatSubmit} className="mb-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about CSS exam preparation, essay writing, current affairs..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={chatLoading}
              />
              <button 
                type="submit"
                disabled={chatLoading || !chatMessage.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors font-medium min-w-[100px]"
              >
                {chatLoading ? '...' : 'Ask AI'}
              </button>
            </div>
          </form>
          
          {chatResponse && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2">
                  <span className="text-green-600">🤖</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">AI Assistant:</h4>
                  <p className="text-gray-700 leading-relaxed">{chatResponse}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            © 2025 CSS Prep Platform - Empowering future civil servants of Pakistan
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;         