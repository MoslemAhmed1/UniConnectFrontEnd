import { useParams } from "react-router-dom";

// Hooks
import { useStudentCourses } from "@/hooks/student/use-student-courses";
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";

// Components
import CoursePage from "@/components/common/course/CoursePage";
import type { FeatureFlags } from "@/constants/user/feature-flags";

export const InstructorCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useStudentCourses();
  const { announcements } = useStudentAnnouncements();
  const { assignments } = useStudentAssignments();
  const { materials } = useStudentMaterials();

  // Find the selected course by code (id from URL)
  const course = courses.find((c) => c.code === id);

  if (!course) {
    return (
      <>
        {/* Lottie React 404 */}
      </>
    );
  }

  const featureFlags: FeatureFlags = {
      showModifyCourseBtn: true,
      showAddMaterialBtn: true,
      showAddAnnouncementBtn: true,
      showAddAssignmentBtn: true,
      showAddCalendarEventBtn: true,
  };

  return (
    <CoursePage
      course = {course}
      materials = {materials}
      announcements = {announcements}
      assignments = {assignments}
      featureFlags={featureFlags}
    />
  );
};
