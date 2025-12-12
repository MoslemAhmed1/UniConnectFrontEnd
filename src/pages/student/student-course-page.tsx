import type { FeatureFlags } from "@/constants/user/feature-flags";

// Hooks
import { useAuth } from "@/providers/context/authContext";

// Components
import CoursePage from "@/components/common/course/CoursePage";
import { useCourseData } from "@/hooks/professor/use-course-data";
import { useParams } from "react-router";

export const StudentCoursePage = () => {
  const { auth } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { courseData } = useCourseData(id);

  if (!courseData) {
    // TODO: Use Lottie React 404 page
    return <></>;
  }

  const studentRole = auth.user?.role;

  const featureFlags: FeatureFlags = {
    showModifyCourseBtn: false,
    showAddMaterialBtn: false,
    showAddAnnouncementBtn: false,
    showAddAssignmentBtn: false,
    showAddCalendarEventBtn: false,
  };

  if (studentRole === "class_representative") {
    featureFlags.showModifyCourseBtn = true;
    featureFlags.showAddMaterialBtn = true;
    featureFlags.showAddAnnouncementBtn = true;
    featureFlags.showAddCalendarEventBtn = true;
  } else if (studentRole === "course_head") {
    const isTeamHeadForThisCourse =
      courseData.representative_id === auth.user?.id;

    if (isTeamHeadForThisCourse) {
      featureFlags.showModifyCourseBtn = true;
      featureFlags.showAddMaterialBtn = true;
      featureFlags.showAddAnnouncementBtn = true;
      featureFlags.showAddCalendarEventBtn = true;
    }
  }

  return <CoursePage course={courseData} featureFlags={featureFlags} />;
};
