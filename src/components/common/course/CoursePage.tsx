// Components
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import CourseHeader from "@/components/common/course/CourseHeader";
import MaterialsSection from "@/components/common/course/materials/MaterialsSection";
import AnnouncementsSection from "@/components/common/course/announcements/AnnouncementsSection";
import AssignmentsSection from "@/components/common/course/assignments/AssignmentsSection";

// Hooks
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";

// Types
import type { Course } from "@/types/student/course";
import type { FeatureFlags } from "@/constants/user/feature-flags";

type CoursePageProps = {
  course: Course;
  featureFlags: FeatureFlags;
}

export default function CoursePage({ course, featureFlags }: CoursePageProps) {
  const { announcements } = useStudentAnnouncements();
  const { assignments } = useStudentAssignments();

  // TODO: backend route returns only 3-4 recent materials + returns an array with the material count for each category ??
  const { materials } = useStudentMaterials();  

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Course Header */}
        <CourseHeader course={course} showModifyCourseBtn={featureFlags.showModifyCourseBtn} />

        {/* Course Content Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* TODO: Remove courseCode Props in all sections if backend route handles them */}
          <TabsContent value="materials">
            <MaterialsSection
              materials={materials}
              courseCode={course.code}
              allowModifyMaterials={featureFlags.showAddMaterialBtn}
            />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsSection
              announcements={announcements}
              courseCode={course.code}
              allowModifyAnnouncements={featureFlags.showAddAnnouncementBtn}
            />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentsSection 
              assignments={assignments}
              courseCode={course.code}
              allowModifyAssignments={featureFlags.showAddAssignmentBtn} 
            />
          </TabsContent>

          <TabsContent value="members">
            {/* TODO: List All Course Students & Instructor can view their profile page (DONE BY MARWAN)*/}
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
