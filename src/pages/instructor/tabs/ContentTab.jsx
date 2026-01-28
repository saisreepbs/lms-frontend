import { useMemo, useState } from 'react';
import LessonsTree from '../../../components/instructor/LessonsTree.jsx';
import LessonEditor from '../../../components/instructor/LessonEditor.jsx';

const initialModules = [
    { id: 'm1', order: 1, title: 'Module 1', lessons: [
        { id: 'l1', order: 1, title: 'JDK and Jvm', type: 'video', resource: '' },
        { id: 'l2', order: 2, title: 'Variables', type: 'video', resource: '' },
    ]},
    { id: 'm2', order: 2, title: 'Module 2', lessons: [
        { id: 'l3', order: 1, title: 'Conditionals', type: 'video', resource: '' },
        { id: 'l4', order: 2, title: 'Garbage Collector', type: 'video', resource: '' },
        { id: 'l5', order: 3, title: 'Loops', type: 'video', resource: '' },
    ]},
    { id: 'm3', order: 3, title: 'Module 3', lessons: [] },
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
        setModules((prev) => prev.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => (l.id === updated.id ? updated : l)),
        })));
    };

    const addModule = () => {
        setModules((prev) => [...prev, {
            id: `m${Date.now()}`,
            order: prev.length + 1,
            title: `Module ${prev.length + 1}`,
            lessons: []
        }]);
    };

    const addLesson = (moduleId) => {
        setModules((prev) => prev.map((m) => {
            if (m.id !== moduleId) return m;
            const order = (m.lessons[m.lessons.length - 1]?.order || 0) + 1;
            return {
                ...m,
                lessons: [...m.lessons, {
                    id: `l${Date.now()}`,
                    order,
                    title: `Lesson ${order}`,
                    type: 'video',
                    resource: ''
                }]
            };
        }));
    };

    return (
        <div className="row g-4">
            <div className="col-lg-4 mb-3 mb-lg-0">
                <LessonsTree
                    modules={modules}
                    activeLessonId={activeLessonId}
                    onSelectLesson={setActiveLessonId}
                    onAddModule={addModule}
                    onAddLesson={addLesson}
                />
            </div>
            <div className="col-lg-8">
                <LessonEditor lesson={activeLesson} onChange={updateLesson} />
            </div>
        </div>
    );
}
