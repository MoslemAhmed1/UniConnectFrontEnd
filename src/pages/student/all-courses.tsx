import { useStudentCourses } from "@/hooks/student/use-student-courses";
import CourseCard from "@/components/student/dashboard/CourseCard"

export default function AllCourses() {
  const { courses, isLoading } = useStudentCourses();

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">All Courses</h1>
          <p className="text-slate-500">Browse all your enrolled courses</p>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">No courses found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.code + course.class} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
