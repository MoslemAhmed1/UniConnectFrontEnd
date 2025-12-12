import { useInstructorCourses } from "@/hooks/instructor/use-instructor-courses";
import CourseCard from "@/components/student/dashboard/CourseCard";
import AvailableCoursesSheet from "@/components/instructor/AvailableCoursesSheet";
// import { useAuth } from "@/providers/context/authContext";

export const MyInstructorCourses = () => {
  const { courses, isLoading } = useInstructorCourses();
  // const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* TODO: implement Available Courses logic */}
        <AvailableCoursesSheet availableCourses={courses} />

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">No courses found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.code} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
