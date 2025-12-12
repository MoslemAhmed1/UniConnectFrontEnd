import { useParams } from "react-router-dom";

// Hooks
import { useCourseData } from "@/hooks/professor/use-course-data";

// Components
import CoursePage from "@/components/common/course/CoursePage";
import type { FeatureFlags } from "@/constants/user/feature-flags";

export const InstructorCoursePage = () => {
  const { id } = useParams<{ id: string }>();

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

  return <CoursePage course={courseData} featureFlags={featureFlags} />;
};
