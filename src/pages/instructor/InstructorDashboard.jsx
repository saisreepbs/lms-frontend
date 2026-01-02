import React from 'react';
import InstructorSidebar from '../../components/instructor/InstructorSidebar.jsx';
import Header from '../../components/instructor/Header.jsx';
import CoursesGrid from '../../components/instructor/CoursesGrid.jsx';

export default function InstructorDashboard({ courses, onNewCourse, onOpenCourse, onRemoveCourse, onCourses, onSettings }) {
  return (
    <div className="min-h-screen flex">
      <InstructorSidebar
        active="courses"
        onCourses={onCourses}
        onSettings={() => {
          if (courses.length) {
            onOpenCourse(courses[0].id);
          } else {
            onSettings(); // fallback to App's openSettings
          }
        }}
      />
      <main className="flex-1 p-6">
        <Header
          title="Courses"
          actions={
            <button
              onClick={onNewCourse}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New Course
            </button>
          }
        />
        <CoursesGrid
          courses={courses}
          onEdit={(course) => onOpenCourse(course.id)}
          onRemove={onRemoveCourse}
        />
      </main>
    </div>
  );
}
