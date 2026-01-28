import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/instructor/Header.jsx";
import Tabs from "../../components/instructor/Tabs.jsx";
import Overview from "./tabs/Overview.jsx";
import ContentTab from "./tabs/ContentTab.jsx";
import Learners from "./tabs/Learners.jsx";
import { getCourse, updateCourse } from "../../api.js";

export default function CourseDetails() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [tab, setTab] = useState("overview");
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    const notificationTimer = useRef(null);

    const tabs = [
        { value: "overview", label: "Overview" },
        { value: "content", label: "Content" },
        { value: "learners", label: "Learners" },
    ];

    const fetchCourse = useCallback(async () => {
        if (!courseId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getCourse(courseId);
            setCourse(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load course");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchCourse();
    }, [fetchCourse]);

    const showNotification = useCallback((message) => {
        if (notificationTimer.current) {
            clearTimeout(notificationTimer.current);
        }
        setNotification(message);
        notificationTimer.current = setTimeout(() => setNotification(null), 4000);
    }, []);

    useEffect(() => {
        return () => {
            if (notificationTimer.current) {
                clearTimeout(notificationTimer.current);
            }
        };
    }, []);

    const handleMetadataSave = async ({ title, description, status, thumbnailFile }) => {
        const payload = { title: title?.trim(), description: description?.trim(), status };
        try {
            await updateCourse(courseId, payload, thumbnailFile || null);
            await fetchCourse();
            showNotification("Course updated successfully.");
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || "Failed to update" };
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Header
                    title="Course Details"
                    description="Loading the latest metadata"
                    showBack={true}
                    onBack={() => navigate("/instructor/courses")}
                    actions={null}
                />
                <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center gap-4 text-slate-600">
                        <span className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
                        Loading course…
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <Header
                    title="Course Details"
                    description="Something went wrong"
                    showBack={true}
                    onBack={() => navigate("/instructor/courses")}
                    actions={null}
                />
                <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-red-100">
                    <p className="text-red-600">{error}</p>
                </section>
            </div>
        );
    }

    if (!course) {
        return null;
    }

    return (
        <div className="space-y-6">
            <Header
                title={course.title || "Course Details"}
                description="Edit the essentials or dive into content management"
                showBack={true}
                onBack={() => navigate("/instructor/courses")}
                actions={null}
            />

            {notification && (
                <div
                    role="status"
                    className="max-w-2xl rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm text-green-700"
                >
                    {notification}
                </div>
            )}

            <section className="rounded-2xl bg-white p-0 shadow-sm ring-1 ring-slate-100">
                <Tabs tabs={tabs} active={tab} onChange={setTab} />
                <div className="px-6 pb-6 pt-2">
                    {tab === "overview" && (
                        <Overview
                            course={course}
                            onSave={handleMetadataSave}
                        />
                    )}
                    {tab === "content" && <ContentTab course={course} />}
                    {tab === "learners" && <Learners />}
                </div>
            </section>
        </div>
    );
}
