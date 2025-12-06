import { useParams } from "react-router-dom";

// Hooks
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";

// Components
import CoursePage from "@/components/common/course/CoursePage";
import type { FeatureFlags } from "@/constants/user/feature-flags";
import { useCourseData } from "@/hooks/professor/use-course-data";

export const InstructorCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { announcements } = useStudentAnnouncements();
  const { assignments } = useStudentAssignments();
  const { materials } = useStudentMaterials();

  // Find the selected course by code (id from URL)
  const { courseData } = useCourseData(id);

  if (!courseData) {
    return <>{/* Lottie React 404 */}</>;
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
      course={courseData}
      materials={materials}
      announcements={announcements}
      assignments={assignments}
      featureFlags={featureFlags}
    />
  );
};
