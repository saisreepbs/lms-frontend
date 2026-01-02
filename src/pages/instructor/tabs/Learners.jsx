// src/pages/instructor/tabs/Learners.jsx
import React from 'react';
import LearnersTable from '../../../components/instructor/LearnersTable.jsx';

const mockLearners = [
    {
        name: 'Sooji',
        email: 'sooji@gmail.com',
        belongsTo: 'CSE/Semester 1/Section-A',
    },
    {
        name: 'juhi',
        email: 'juhi@gmail.com',
        belongsTo: 'CST/Semester 8/Section-A',
    },
];

export default function Learners() {
    return <LearnersTable learners={mockLearners} />;
}
