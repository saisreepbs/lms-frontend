import { useState } from "react";
import Courses from "./Courses";
import CourseOverview from "./CourseOverview";
import CourseContent from "./CourseContent";


export default function LearnerLayout() {
const [page, setPage] = useState("courses"); // courses | overview | content


return (
<div className="flex h-screen bg-[#FCF6D9]">
{/* Sidebar */}
<div className="w-64 bg-[#434E78] text-white p-4">
<div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center" >👤</div>
        <h1 className="text-2xl font-semibold text-white">Tenant Name</h1><br/>
       
      </div>
       <h1 className="text-xl flex items-center justify-center mb-6">Learner</h1>
<br/>

<button
className="w-full mb-3 py-2 rounded bg-white text-[#434E78]"
onClick={() => setPage("courses")}
>
Courses
</button>
</div>


{/* Main content */}
<div className="flex-1 p-6">
{page === "courses" && (
<Courses onView={() => setPage("overview")} />
)}
{page === "overview" && (
<CourseOverview
onBack={() => setPage("courses")}
onContent={() => setPage("content")}
/>
)}
{page === "content" && (
<CourseContent onBack={() => setPage("overview")} />
)}
</div>
</div>
);
}