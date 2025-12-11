import api from "@/lib/axios";
import type { StudentUser } from "@/types/student/student-user";
import type { User } from "@/types/user/user";
import { useQuery } from "@tanstack/react-query";

const useCourseMembers = (courseCode: string) => {
  const { data: courseMembers, isLoading: isLoadingCourseMembers } = useQuery<{
    students: StudentUser[];
    instructors: User[];
  }>({
    queryKey: ["course-members", courseCode],
    queryFn: async () => {
      const result = await api.get(`/api/courses/${courseCode}/members`);
      return result.data.data;
    },
    initialData: {
      instructors: [],
      students: [],
    },
  });

  return {
    courseMembers,
    isLoadingCourseMembers,
  };
};

export default useCourseMembers;
