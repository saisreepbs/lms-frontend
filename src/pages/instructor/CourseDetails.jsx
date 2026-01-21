import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/instructor/Header.jsx";
import Tabs from "../../components/instructor/Tabs.jsx";
import Overview from "./tabs/Overview.jsx";
import ContentTab from "./tabs/ContentTab.jsx";
import Learners from "./tabs/Learners.jsx";
import { getCourseById, updateCourse } from "../../api/courseService.js";

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
            const data = await getCourseById(courseId);
            setCourse(data);
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data || "Failed to load course.";
            setError(message);
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
        const payload = {
            title: title?.trim(),
            description: description?.trim(),
            status,
        };

        try {
            await updateCourse(courseId, payload, thumbnailFile || null);
            await fetchCourse();
            showNotification("Course updated successfully.");
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || err.response?.data || "Failed to update course.";
            return { success: false, error: message };
        }
    };

    if (loading) {
        return (
            <div>
                <Header
                    title="Course Details"
                    showBack={true}
                    onBack={() => navigate("/instructor/courses")}
                    actions={null}
                />
                <div className="flex items-center justify-center py-12 text-gray-600">Loading course...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header
                    title="Course Details"
                    showBack={true}
                    onBack={() => navigate("/instructor/courses")}
                    actions={null}
                />
                <div className="max-w-md mx-auto mt-8 bg-red-50 border border-red-200 rounded p-4 text-red-700">
                    {error}
                </div>
            </div>
        );
    }

    if (!course) {
        return null;
    }

    return (
        <div>
            <Header
                title={course.title || "Course Details"}
                showBack={true}
                onBack={() => navigate("/instructor/courses")}
                actions={null}
            />

            {notification && (
                <div className="mt-4 max-w-2xl px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded">
                    {notification}
                </div>
            )}

            <Tabs tabs={tabs} active={tab} onChange={setTab} />
            {tab === "overview" && (
                <Overview
                    course={course}
                    onSave={handleMetadataSave}
                />
            )}
            {tab === "content" && <ContentTab course={course} />}
            {tab === "learners" && <Learners />}
        </div>
    );
}
