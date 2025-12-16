import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { CourseCard } from "@/components/admin/CourseCard";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { CreateCourseModal } from "@/components/instructor/CreateCourseModal";
import { Button } from "@/components/ui/button";
import { useStudentCourses } from "@/hooks/student/use-student-courses";
import type { Course } from "@/types/student/course";

export const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useStudentCourses({ page, perPage: 10, search });

  const courses = data?.data ?? [];
  const totalPages = Math.ceil((data?.total ?? 0) / 10);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Courses</h1>

          <CreateCourseModal
            trigger={
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Course
              </Button>
            }
          />
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>

        <AdminPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            courses.map((course: Course) => (
              <CourseCard key={course.code} course={course} />
            ))
          )}
        </div>

        {courses.length === 0 && (
          // TODO: Skeleton Loader / Spinner
          <p className="text-center text-muted-foreground py-8">
            No courses found. 
          </p>
        )}

        <AdminPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default CoursesPage;