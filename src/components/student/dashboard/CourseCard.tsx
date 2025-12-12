import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { Course } from "@/types/student/course";
import Teachers from "./Teachers";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  // TODO: Fix this
  return (
    <Link to={`/student/courses/${course.code}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer h-72 p-0 gap-0">
        <CardHeader className="p-0">
          <img
            src={course.image_url}
            alt={course.name}
            className="w-full h-32 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-1 flex flex-col gap-1">
          <h3 className="font-semibold text-slate-800 mb-2">{course.name}</h3>
          <Teachers teachers={course.teachers} />
          <span className="text-slate-500">{course.code}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
