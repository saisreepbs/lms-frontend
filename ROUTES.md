# LMS Frontend - Routes Documentation

This document describes all available routes in the LMS Frontend application.

## Overview

The application uses React Router v7 for client-side routing. Routes are organized by user roles:

- **Public Routes** - Login/Authentication
- **SuperAdmin Routes** - Platform-level management
- **Tenant Admin Routes** - Organization management
- **Instructor Routes** - Course creation and management
- **Learner Routes** - Course consumption

---

## Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Login` | Landing page with login form |
| `/login` | `Login` | Login page (alias) |

---

## SuperAdmin Routes

Base path: `/superadmin`

| Route | Component | Description |
|-------|-----------|-------------|
| `/superadmin` | `SuperAdmin` | SuperAdmin dashboard |
| `/superadmin/tenants` | `SuperAdmin` | List all tenants |
| `/superadmin/tenants/new` | `SuperAdmin` | Create new tenant form |

### Layout
All SuperAdmin routes use `SuperAdminLayout` which includes:
- Sidebar with navigation
- Logout button
- Main content area

---

## Tenant Admin Routes

Base path: `/admin`

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin` | `Dashboard` | Admin dashboard with stats |
| `/admin/dashboard` | `Dashboard` | Dashboard (alias) |
| `/admin/organization` | `OrgStructure` | View organization hierarchy tree |
| `/admin/organization/create` | `CreateStructure` | Create new org structure |
| `/admin/organization/update` | `AddStructure` | Add items to existing structure |
| `/admin/users` | `UserManagement` | Manage users (CRUD) |

### Layout
All Tenant Admin routes use `TenantAdminLayout` which includes:
- Sidebar with navigation (Dashboard, Organization Structure, User Management)
- Logout button
- Main content area

---

## Instructor Routes

Base path: `/instructor`

| Route | Component | Description |
|-------|-----------|-------------|
| `/instructor` | `InstructorDashboard` | List of instructor's courses |
| `/instructor/courses` | `InstructorDashboard` | Courses list (alias) |
| `/instructor/courses/new` | `CreateCourse` | Create new course form |
| `/instructor/courses/:courseId` | `CourseDetails` | View/edit course details |

### Dynamic Parameters
- `:courseId` - The unique identifier of a course (e.g., `/instructor/courses/c-123`)

### Layout
All Instructor routes use `InstructorLayout` which includes:
- Sidebar with navigation (Courses, Settings)
- Logout button
- Main content area

---

## Learner Routes

Base path: `/learner`

| Route | Component | Description |
|-------|-----------|-------------|
| `/learner` | `Courses` | Browse available courses |
| `/learner/courses` | `Courses` | Courses list (alias) |
| `/learner/courses/:courseId` | `CourseOverview` | Course overview and details |
| `/learner/courses/:courseId/content` | `CourseContent` | Watch course content/lessons |

### Dynamic Parameters
- `:courseId` - The unique identifier of a course (e.g., `/learner/courses/1`)

### Layout
All Learner routes use `LearnerLayout` which includes:
- Sidebar with navigation (Courses)
- Logout button
- Main content area

---

## File Structure

```
src/
├── routes.jsx                 # Main router configuration
├── login.jsx                  # Login page component
├── layouts/
│   ├── SuperAdminLayout.jsx   # SuperAdmin layout wrapper
│   ├── TenantAdminLayout.jsx  # Tenant Admin layout wrapper
│   ├── InstructorLayout.jsx   # Instructor layout wrapper
│   └── LearnerLayout.jsx      # Learner layout wrapper
└── pages/
    ├── superadmin/
    │   └── SuperAdmin.jsx
    ├── tenant-admin/
    │   ├── Dashboard.jsx
    │   ├── OrgStructure.jsx
    │   ├── CreateStructure.jsx
    │   ├── AddStructure.jsx
    │   └── UserManagement.jsx
    ├── instructor/
    │   ├── InstructorDashboard.jsx
    │   ├── CreateCourse.jsx
    │   ├── CourseDetails.jsx
    │   └── tabs/
    │       ├── Overview.jsx
    │       ├── ContentTab.jsx
    │       └── Learners.jsx
    └── learner/
        ├── Courses.jsx
        ├── CourseOverview.jsx
        └── CourseContent.jsx
```

---

## Navigation Flow

```
                         ┌─────────────────┐
                         │     LOGIN       │
                         │   (/ or /login) │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
     ┌────────────────┐  ┌───────────────┐  ┌────────────────┐
     │  SUPER ADMIN   │  │ TENANT ADMIN  │  │   INSTRUCTOR   │
     │  /superadmin   │  │    /admin     │  │  /instructor   │
     └────────┬───────┘  └───────┬───────┘  └────────┬───────┘
              │                  │                   │
              ▼                  ▼                   ▼
     ┌────────────────┐  ┌───────────────┐  ┌────────────────┐
     │ Manage Tenants │  │  Dashboard    │  │    Courses     │
     │ Create Tenant  │  │  Org Structure│  │  Create Course │
     └────────────────┘  │  Users        │  │  Course Details│
                         └───────────────┘  └────────────────┘
                         
                                  │
                                  ▼
                         ┌───────────────┐
                         │    LEARNER    │
                         │   /learner    │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │   Courses     │
                         │   Overview    │
                         │   Content     │
                         └───────────────┘
```

---

## Usage Examples

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  // Navigate to a route
  navigate('/instructor/courses');
  
  // Navigate with params
  navigate(`/learner/courses/${courseId}`);
  
  // Go back
  navigate(-1);
}
```

### Accessing Route Parameters

```jsx
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { courseId } = useParams();
  // courseId = "c-123" when URL is /instructor/courses/c-123
}
```

### Link Components

```jsx
import { Link } from 'react-router-dom';

<Link to="/admin/users">User Management</Link>
<Link to={`/learner/courses/${course.id}`}>View Course</Link>
```

---

## Future Improvements

- [ ] Add authentication guards (protected routes)
- [ ] Add 404 Not Found page
- [ ] Add loading states during navigation
- [ ] Implement breadcrumbs
- [ ] Add route-based code splitting (lazy loading)
