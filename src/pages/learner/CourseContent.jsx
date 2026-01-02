import { useState } from "react";


export default function CourseContent({ onBack }) {
const [activeLesson, setActiveLesson] = useState("Loops");


return (
<div>
<button onClick={onBack} className="mb-4">🡸 Course Details</button>


<div className="flex border rounded mb-6">
<button className="flex-1 py-2">Overview</button>
<button className="flex-1 py-2 bg-[#9db7e8]">Content</button>
</div>


<div className="flex gap-6">
{/* Left modules */}
<div className="w-64 border bg-white p-3 h-80 overflow-y-auto">
<p className="font-semibold mb-2">Course Content</p>
<div className="text-sm">
<p className="font-semibold">Module 1</p>
<p className="ml-4 cursor-pointer" onClick={() => setActiveLesson("JDK & JVM")}>
Lesson 1: JDK and JVM
</p>
<p className="ml-4 cursor-pointer" onClick={() => setActiveLesson("Variables")}>
Lesson 2: Variables
</p>
<p className="font-semibold mt-2">Module 2</p>
<p className="ml-4 cursor-pointer" onClick={() => setActiveLesson("Conditionals")}>
Lesson 1: Conditionals
</p>
<p className="ml-4 cursor-pointer" onClick={() => setActiveLesson("Loops")}>
Lesson 2: Loops
</p>
</div>
</div>

{/* Right video */}
<div className="flex-1 border bg-white p-4">
<h3 className="font-semibold mb-3">Lesson: {activeLesson}</h3>
<video
controls
className="w-75% mb-3"
src="https://www.youtube.com/watch?v=BGTx91t8q50"
/>
<p className="text-sm">
{activeLesson} are fundamental concepts used in programming.
</p>
</div>
</div>
</div>
);
}