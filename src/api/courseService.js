import api from "./axios";

/**
 * Fetch all courses for a tenant
 * @param {string} tenantId - Tenant UUID
 * @returns {Promise<Array>} List of courses
 */
const normalizeListResponse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object") {
    return Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));
  }
  return [];
};

export const getCoursesByTenant = async (tenantId) => {
  const response = await api.get(`/api/courses/tenants/${tenantId}`);
  return normalizeListResponse(response.data);
};

/**
 * Create a new course
 * @param {string} tenantId - Tenant UUID
 * @param {Object} courseData - Course data (title, description, instructorId, visibility)
 * @param {File} thumbnailFile - Course thumbnail image
 * @returns {Promise<void>}
 */
export const createCourse = async (tenantId, courseData, thumbnailFile) => {
  const formData = new FormData();
  formData.append("tenantId", tenantId);
  formData.append("thumbnailFile", thumbnailFile);
  formData.append(
    "data",
    new Blob([JSON.stringify(courseData)], { type: "application/json" })
  );

  const response = await api.post("/api/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Get all modules for a course
 * @param {string} courseId - Course UUID
 * @returns {Promise<Array>} List of modules
 */
export const getCourseModules = async (courseId) => {
  const response = await api.get(`/api/courses/${courseId}/modules`);
  return response.data;
};

/**
 * Create a new module for a course
 * @param {string} courseId - Course UUID
 * @returns {Promise<void>}
 */
export const createModule = async (courseId) => {
  const response = await api.post(`/api/courses/${courseId}/modules`);
  return response.data;
};

/**
 * Get all lessons for a module
 * @param {string} moduleId - Module UUID
 * @returns {Promise<Array>} List of lessons
 */
export const getModuleLessons = async (moduleId) => {
  const response = await api.get(`/api/courses/modules/${moduleId}/lessons`);
  return response.data;
};

/**
 * Create a new lesson for a module
 * @param {string} moduleId - Module UUID
 * @returns {Promise<void>}
 */
export const createLesson = async (moduleId) => {
  const response = await api.post(`/api/courses/modules/${moduleId}/lessons`);
  return response.data;
};

/**
 * Update a lesson
 * @param {string} lessonId - Lesson UUID
 * @param {Object} lessonData - Lesson data (title, content, type, orderIndex, videoUrl)
 * @returns {Promise<void>}
 */
export const updateLesson = async (lessonId, lessonData) => {
  const response = await api.put(
    `/api/courses/modules/lessons/${lessonId}`,
    lessonData
  );
  return response.data;
};

export default {
  getCoursesByTenant,
  createCourse,
  getCourseModules,
  createModule,
  getModuleLessons,
  createLesson,
  updateLesson,
};
