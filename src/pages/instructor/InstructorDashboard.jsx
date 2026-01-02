import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/instructor/Header.jsx';
import CoursesGrid from '../../components/instructor/CoursesGrid.jsx';

export default function InstructorDashboard() {
  const navigate = useNavigate();
  
  // TODO: Replace with API call or global state
  const [courses, setCourses] = useState([
    {
      id: 'c-1',
      title: 'Programming with Java',
      description: 'Learn Java from scratch',
      visibility: 'active',
      createdAt: '2025-12-01',
    },
    {
      id: 'c-2',
      title: 'Web Development Basics',
      description: 'HTML, CSS, and JavaScript',
      visibility: 'hidden',
      createdAt: '2025-12-15',
    },
  ]);

  const handleRemoveCourse = (courseId) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

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
      <CoursesGrid
        courses={courses}
        onEdit={(course) => navigate(`/instructor/courses/${course.id}`)}
        onRemove={handleRemoveCourse}
      />
    </div>
  );
}
