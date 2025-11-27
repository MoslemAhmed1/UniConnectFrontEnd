import { useParams } from "react-router-dom";

// Hooks
import { useStudentCourses } from "@/hooks/student/use-student-courses";
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";

// Components
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Calendar, Users } from "lucide-react";
import CourseHeader from "@/components/student/course/CourseHeader";
import MaterialsSection from "@/components/student/course/MaterialsSection";
import AnnouncementsSection from "@/components/student/course/AnnouncementsSection";

export const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useStudentCourses();
  const { announcements, isLoading: isLoadingAnnouncements } =
    useStudentAnnouncements();
  const { materials, isLoading: isLoadingMaterials } = useStudentMaterials();

  // Find the selected course by code (id from URL)
  const course = courses.find((c) => c.code === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex flex-1 items-center justify-center px-6">
          <Alert
            variant="destructive"
            className="max-w-xl w-full text-center py-10 border-2"
          >
            <AlertTitle className="text-2xl font-semibold mb-2">
              Course Not Found
            </AlertTitle>
            <AlertDescription className="text-base">
              The course you are looking for does not exist or may have been
              removed.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Filter announcements by course code
  const courseAnnouncements = announcements.filter(
    (a) => a.courseCode === course.code
  );
  const courseMaterials = materials.filter((m) => m.courseCode === course.code);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        {/* Course Header */}
        <CourseHeader course={course} />

        {/* Course Content Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="materials">
            <MaterialsSection
              materials={courseMaterials}
              isLoading={isLoadingMaterials}
              courseCode={course.code}
            />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsSection
              announcements={courseAnnouncements}
              isLoading={isLoadingAnnouncements}
            />
          </TabsContent>

          <TabsContent value="events">
            {/* TODO: Fetch course-specific calendar events from the calendar page and show them here */}
            <Card className="p-8 text-center gap-0">
              <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Course Events
              </h3>
              <p className="text-muted-foreground">
                View all course-related events and deadlines
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            {/* TODO Later */}
            <Card className="p-8 text-center gap-0">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Course Members
              </h3>
              <p className="text-gray-500">124 students and 3 instructors</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
