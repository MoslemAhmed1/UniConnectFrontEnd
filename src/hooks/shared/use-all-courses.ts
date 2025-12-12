import api from "@/lib/axios";
import type { Course } from "@/types/student/course";
import { useQuery } from "@tanstack/react-query";

const useAllCourses = () => {
  const { data: allCourses, isLoading: isLoadingAllCourses } = useQuery<
    Course[]
  >({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const result = await api.get("/api/courses");
      return result.data.data;
    },
    initialData: [],
  });

  return {
    allCourses,
    isLoadingAllCourses,
  };
};

export default useAllCourses;
