// src/pages/instructor/tabs/ContentTab.jsx
import React, { useMemo, useState } from 'react';
import LessonsTree from '../../../components/instructor/LessonsTree.jsx';
import LessonEditor from '../../../components/instructor/LessonEditor.jsx';

const initialModules = [
    {
        id: 'm1',
        order: 1,
        title: 'Module 1',
        lessons: [
            { id: 'l1', order: 1, title: 'JDK and Jvm', type: 'video', resource: '' },
            { id: 'l2', order: 2, title: 'Variables', type: 'video', resource: '' },
        ],
    },
    {
        id: 'm2',
        order: 2,
        title: 'Module 2',
        lessons: [
            { id: 'l3', order: 1, title: 'Conditionals', type: 'video', resource: '' },
            { id: 'l4', order: 2, title: 'Garbage Collector', type: 'video', resource: '' },
            { id: 'l5', order: 3, title: 'Loops', type: 'video', resource: '' },
        ],
    },
    { id: 'm3', order: 3, title: 'Module 3', lessons: [] },
    { id: 'm4', order: 4, title: 'Module 4', lessons: [] },
    { id: 'm5', order: 5, title: 'Module 5', lessons: [] },
];

export default function ContentTab() {
    const [modules, setModules] = useState(initialModules);
    const [activeLessonId, setActiveLessonId] = useState('l5');

    const activeLesson = useMemo(() => {
        for (const m of modules) {
            const l = m.lessons.find((x) => x.id === activeLessonId);
            if (l) return { ...l };
        }
        return null;
    }, [modules, activeLessonId]);

    const updateLesson = (updated) => {
        setModules((prev) =>
            prev.map((m) => ({
                ...m,
                lessons: m.lessons.map((l) => (l.id === updated.id ? updated : l)),
            }))
        );
    };

    const saveLesson = (lesson) => {
        // placeholder for API save
        console.log('Saving lesson', lesson);
    };

    const addModule = () => {
        setModules((prev) => {
            const order = prev.length + 1;
            const id = `m${Date.now()}`;
            return [...prev, { id, order, title: `Module ${order}`, lessons: [] }];
        });
    };

    const addLesson = (moduleId) => {
        setModules((prev) =>
            prev.map((m) => {
                if (m.id !== moduleId) return m;
                const order = (m.lessons[m.lessons.length - 1]?.order || 0) + 1;
                const id = `l${Date.now()}`;
                const newLesson = { id, order, title: `Lesson ${order}`, type: 'video', resource: '' };
                return { ...m, lessons: [...m.lessons, newLesson] };
            })
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LessonsTree
                modules={modules}
                activeLessonId={activeLessonId}
                onSelectLesson={setActiveLessonId}
                onAddModule={addModule}
                onAddLesson={addLesson}
            />
            <LessonEditor lesson={activeLesson} onChange={updateLesson} onSave={saveLesson} />
        </div>
    );
}
