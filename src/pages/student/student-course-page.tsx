import type { FeatureFlags } from "@/constants/user/feature-flags";
import { useParams } from "react-router-dom";

// Hooks
import { useCourseAnnouncements } from "@/hooks/student/use-course-announcements";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";
import { useAuth } from "@/providers/context/authContext";

// Components
import CoursePage from "@/components/common/course/CoursePage";
import useStudentCourse from "@/hooks/student/use-student-course";

export const StudentCoursePage = () => {
  const { auth } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { announcements } = useCourseAnnouncements(id);
  const { assignments } = useStudentAssignments(id);
  const { materials } = useStudentMaterials();
  const { course } = useStudentCourse();

  if (!course) {
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
    const isTeamHeadForThisCourse = course.representative_id === auth.user?.id;

    if (isTeamHeadForThisCourse) {
      featureFlags.showModifyCourseBtn = true;
      featureFlags.showAddMaterialBtn = true;
      featureFlags.showAddAnnouncementBtn = true;
      featureFlags.showAddCalendarEventBtn = true;
    }
  }

  return (
    <CoursePage
      course={course}
      materials={materials}
      announcements={announcements}
      assignments={assignments}
      featureFlags={featureFlags}
    />
  );
};
