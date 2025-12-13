import { useParams } from "react-router-dom";

// Hooks
import { useCourseData } from "@/hooks/professor/use-course-data";

// Components
import CoursePage from "@/components/common/course/CoursePage";
import type { FeatureFlags } from "@/constants/user/feature-flags";
import notFoundAnimation from "@/assets/lottie/Error 404.json";
import CustomLottie from "@/components/global/CustomLottie";

export const InstructorCoursePage = () => {
  const { id } = useParams<{ id: string }>();

  // Find the selected course by code (id from URL)
  const { courseData } = useCourseData(id);

  if (!courseData) {
    return (
      <CustomLottie
        message="Oops, this course doesn't exist."
        animationData={notFoundAnimation}
      />
    );
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
