import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCoursesByTenant } from '../../api/courseService';
import Header from '../../components/instructor/Header.jsx';
import CoursesGrid from '../../components/instructor/CoursesGrid.jsx';

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.tenantId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getCoursesByTenant(user.tenantId);
        
        // Courses are already filtered by backend
        setCourses(data || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleRemoveCourse = async (courseId) => {
    // TODO: Implement delete course API
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== courseId));
    }
  };

  if (loading) {
    return (
      <div>
        <Header
          title="Courses"
          actions={
            <button
              onClick={() => navigate('/instructor/courses/new')}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New Course
            </button>
          }
        />
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header
          title="Courses"
          actions={
            <button
              onClick={() => navigate('/instructor/courses/new')}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New Course
            </button>
          }
        />
        <div className="flex items-center justify-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
            <p className="text-red-600 font-medium">Error loading courses</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Courses"
        actions={
          <button
            onClick={() => navigate('/instructor/courses/new')}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + New Course
          </button>
        }
      />
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-500 text-sm mb-4">Create your first course to get started</p>
          <button
            onClick={() => navigate('/instructor/courses/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Create Course
          </button>
        </div>
      ) : (
        <CoursesGrid
          courses={courses}
          onEdit={(course) => navigate(`/instructor/courses/${course.id}`)}
          onRemove={handleRemoveCourse}
        />
      )}
    </div>
  );
}
