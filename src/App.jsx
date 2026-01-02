import React, { useState } from 'react';
import InstructorDashboard from './pages/instructor/InstructorDashboard.jsx';
import CreateCourse from './pages/instructor/CreateCourse.jsx';
import CourseDetails from './pages/instructor/CourseDetails.jsx';

export default function App() {
  const [route, setRoute] = useState({ page: 'dashboard' });
  const [courses, setCourses] = useState([
    { id: 'c1', title: 'Programming with Java', description: 'Intro to Java basics', visibility: 'active' },
    { id: 'c2', title: 'Data Structures', description: 'Learn DS in depth', visibility: 'hidden' },
  ]);

  const goToDashboard = () => setRoute({ page: 'dashboard' });
  const goToCreateCourse = () => setRoute({ page: 'create-course' });
  const goToCourseDetails = (courseId) => setRoute({ page: 'course-details', courseId });

  const openSettings = () => {
    if (courses.length > 0) {
      goToCourseDetails(courses[0].id);
    } else {
      // If no courses yet, go to dashboard or create page
      goToDashboard();
    }
  };

  const addCourse = (newCourse) => {
    setCourses((prev) => [...prev, newCourse]);
    goToDashboard();
  };

  const updateCourse = (updatedCourse) => {
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    // Stay on CourseDetails or go back
    setRoute((r) => r);
  };

  const removeCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    goToDashboard();
  };

  if (route.page === 'create-course') {
    return (
      <CreateCourse
        onCancel={goToDashboard}
        onCreated={addCourse}
        onCourses={goToDashboard}
        onSettings={openSettings}
      />
    );
  }

  if (route.page === 'course-details') {
    const course = courses.find((c) => c.id === route.courseId);
    return (
      <CourseDetails
        course={course}
        onBack={goToDashboard}
        onUpdate={updateCourse}
        onCourses={goToDashboard}
        onSettings={openSettings}
      />
    );
  }

  return (
    <InstructorDashboard
      courses={courses}
      onNewCourse={goToCreateCourse}
      onOpenCourse={goToCourseDetails}
      onRemoveCourse={removeCourse}
      onCourses={goToDashboard}
      onSettings={openSettings}
    />
  );
}
