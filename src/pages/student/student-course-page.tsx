import { useParams } from "react-router-dom";
import type { FeatureFlags } from "@/constants/user/feature-flags";

// Hooks
import { useStudentCourses } from "@/hooks/student/use-student-courses";
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";
import { useAuth } from "@/providers/context/authContext";

// Components
import CoursePage from "@/components/common/course/CoursePage";


export const StudentCoursePage = () => {
  const { auth } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { courses } = useStudentCourses();
  const { announcements } = useStudentAnnouncements();
  const { assignments } = useStudentAssignments();
  const { materials } = useStudentMaterials();

  // Find the selected course by code (id from URL)
  const course = courses.find((c) => c.code === id);

  if (!course) {
    // TODO: Use Lottie React 404 page
    return (
      <></>
    )
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
  }
  else if (studentRole === "course_head") {
    const isTeamHeadForThisCourse = (course.representative_id === auth.user?.id);

    if (isTeamHeadForThisCourse) {
      featureFlags.showModifyCourseBtn = true;
      featureFlags.showAddMaterialBtn = true;
      featureFlags.showAddAnnouncementBtn = true;
      featureFlags.showAddCalendarEventBtn = true;
    }
  }

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
