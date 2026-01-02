import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/instructor/Header.jsx';
import Tabs from '../../components/instructor/Tabs.jsx';
import Overview from './tabs/Overview.jsx';
import ContentTab from './tabs/ContentTab.jsx';
import Learners from './tabs/Learners.jsx';

export default function CourseDetails() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [tab, setTab] = useState('overview');

    // TODO: Fetch course from API using courseId
    const [course, setCourse] = useState({
        id: courseId,
        title: 'Programming with Java',
        description: 'Learn Java from scratch',
        visibility: 'active',
        createdAt: '2025-12-01',
    });

    const tabs = [
        { value: 'overview', label: 'Overview' },
        { value: 'content', label: 'Content' },
        { value: 'learners', label: 'Learners' },
    ];

    const handleUpdate = (updatedCourse) => {
        setCourse(updatedCourse);
        // TODO: Save to API
    };

    if (!course) {
        return (
            <div>
                <Header
                    title="Course Details"
                    actions={
                        <button
                            onClick={() => navigate('/instructor/courses')}
                            className="px-3 py-2 border rounded hover:bg-gray-50"
                        >
                            Back to Courses
                        </button>
                    }
                />
                <div className="text-gray-600">No course selected.</div>
            </div>
        );
    }

    return (
        <div>
            <Header
                title="Course Details"
                showBack={true}
                onBack={() => navigate('/instructor/courses')}
                actions={null}
            />

            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === 'overview' && <Overview course={course} onUpdate={handleUpdate} />}
            {tab === 'content' && <ContentTab course={course} />}
            {tab === 'learners' && <Learners />}
        </div>
    );
}
