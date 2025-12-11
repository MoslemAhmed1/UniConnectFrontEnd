// Components
import AnnouncementsSection from "@/components/common/course/announcements/AnnouncementsSection";
import AssignmentsSection from "@/components/common/course/assignments/AssignmentsSection";
import CourseHeader from "@/components/common/course/CourseHeader";
import MaterialsSection from "@/components/common/course/materials/MaterialsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseMembersSection from "./members/CourseMembersSection";

// Types
import type { FeatureFlags } from "@/constants/user/feature-flags";
import type { Announcement } from "@/types/student/announcement";
import type { Assignment } from "@/types/student/assignment";
import type { Course } from "@/types/student/course";
import type { Material } from "@/types/student/material";

type CoursePageProps = {
  course: Course;
  materials: Material[];
  announcements: Announcement[];
  assignments: Assignment[];
  featureFlags: FeatureFlags;
};

export default function CoursePage({
  course,
  materials,
  announcements,
  assignments,
  featureFlags,
}: CoursePageProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Course Header */}
        <CourseHeader
          course={course}
          showModifyCourseBtn={featureFlags.showModifyCourseBtn}
        />

        {/* Course Content Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

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
              courseStudentsCount={course.students_number}
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
            {/* TODO: Create profile page */}
            <CourseMembersSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
