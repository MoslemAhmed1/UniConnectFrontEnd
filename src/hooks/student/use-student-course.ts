import api from "@/lib/axios";
import type { Course } from "@/types/student/course";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const useStudentCourse = () => {
  const { id } = useParams();

  const { data: course, isLoading: isLoadingCourse } = useQuery<Course>({
    queryKey: [`course-${id}`],
    queryFn: async () => {
      const result = await api.get(`/api/courses/${id}`);
      return result.data.data;
    },
  });

  return {
    course,
    isLoadingCourse,
  };
};

export default useStudentCourse;
