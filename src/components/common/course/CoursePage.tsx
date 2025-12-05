// Components
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import CourseHeader from "@/components/common/course/CourseHeader";
import MaterialsSection from "@/components/common/course/materials/MaterialsSection";
import AnnouncementsSection from "@/components/common/course/announcements/AnnouncementsSection";
import AssignmentsSection from "@/components/common/course/assignments/AssignmentsSection";

// Types
import type { Material } from "@/types/student/material";
import type { Announcement } from "@/types/student/announcement";
import type { Course } from "@/types/student/course";
import type { Assignment } from "@/types/student/assignment";
import type { FeatureFlags } from "@/constants/user/feature-flags";

type CoursePageProps = {
  course: Course;
  materials: Material[];
  announcements: Announcement[];
  assignments: Assignment[];
  featureFlags: FeatureFlags;
}

export default function CoursePage({course, materials, announcements, assignments, featureFlags}: CoursePageProps) {
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
            {/* TODO: List All Course Students & Instructor can view their profile page */}
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
