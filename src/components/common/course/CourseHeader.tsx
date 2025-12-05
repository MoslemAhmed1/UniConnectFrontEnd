import { Badge } from "@/components/ui/badge";
import { Users, Edit } from "lucide-react";
import type { Course } from "@/types/student/course";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CourseHeaderProps = {
  course: Course;
  showModifyCourseBtn: boolean;
};

export default function CourseHeader({ course, showModifyCourseBtn }: CourseHeaderProps) {
  return (
    <div className="mb-8">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-emerald-400 text-white">{course.class}</Badge>
          <Badge variant="outline">{course.code}</Badge>
        </div>
        <div className="flex items-center gap-3">
          {/* TODO: Implement Modify Course */}
          {showModifyCourseBtn && (
            <Link to="">
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Edit className="w-4 h-4 mr-2" />
                Modify Course
              </Button>
            </Link>
          )}
        </div>
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
