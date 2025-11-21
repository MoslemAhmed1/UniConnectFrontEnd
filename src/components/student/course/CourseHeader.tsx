import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Course } from "@/types/student/course";

type CourseHeaderProps = {
  course: Course;
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="secondary">Fall 2025</Badge>
        <Badge variant="outline">{course.code}</Badge>
      </div>
      <h1 className="text-4xl font-bold text-slate-800 mb-3">
        {course.name}
      </h1>
      <div className="flex items-center gap-6 text-slate-500 flex-wrap"> {/* flex-wrap extra */}
        <span>{course.instructor}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          124 students
        </span>
      </div>
    </div>
  );
}
