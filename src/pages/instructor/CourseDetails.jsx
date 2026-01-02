import React, { useState } from 'react';
import InstructorSidebar from '../../components/instructor/InstructorSidebar.jsx';
import Header from '../../components/instructor/Header.jsx';
import Tabs from '../../components/instructor/Tabs.jsx';
import Overview from './tabs/Overview.jsx';
import ContentTab from './tabs/ContentTab.jsx';
import Learners from './tabs/Learners.jsx';

export default function CourseDetails({ course, onBack, onUpdate, onCourses, onSettings }) {
    const [tab, setTab] = useState('overview');

    const tabs = [
        { value: 'overview', label: 'Overview' },
        { value: 'content', label: 'Content' },
        { value: 'learners', label: 'Learners' },
    ];

    if (!course) {
        return (
            <div className="min-h-screen flex">
                <InstructorSidebar active="settings" onCourses={onCourses} onSettings={onSettings} />
                <main className="flex-1 p-6">
                    <Header
                        title="Course Details"
                        actions={<button onClick={onBack} className="px-3 py-2 border rounded hover:bg-gray-50">Back to Courses</button>}
                    />
                    <div className="text-gray-600">No course selected.</div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            <InstructorSidebar active="settings" onCourses={onCourses} onSettings={() => { /* already here */ }} />
            <main className="flex-1 p-6 ">
                <Header
                    title="Course Details"
                    showBack={true}
                    onBack={onBack}
                    actions={null}
                />

                <Tabs tabs={tabs} active={tab} onChange={setTab} />
                {tab === 'overview' && <Overview course={course} onUpdate={onUpdate} />}
                {tab === 'content' && <ContentTab course={course} />}
                {tab === 'learners' && <Learners />}
            </main>
        </div>
    );
}
