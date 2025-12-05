import { Card, CardContent , CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import type { Course } from "@/types/student/course"

type CourseCardProps = {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/student/courses/${course.code}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer p-0 gap-0">
        <CardHeader className="p-0">
          <img src={course.image_url} alt={course.name}  className="w-full h-32 object-cover"/>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-1 flex flex-col gap-1">
          <h3 className="font-semibold text-slate-800 mb-2">{course.name}</h3>
          <p className="text-sm text-slate-500 mb-2">{course.instructor}</p>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-slate-500">{course.code}</span>
            <span className="text-blue-600 font-medium">{course.class}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}