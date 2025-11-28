import api from "@/lib/axios";
import type { Course } from "@/types/student/course";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCourseData = (courseCode: string) => {
  const {
    data: courseData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-course", courseCode],
    queryFn: async () => {
      try {
        const res = await api.get<Course>(`/api/courses/${courseCode}`);
        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data && "message" in err.response.data) {
            const message = err.response.data.message;
            throw new Error(message);
          }

          throw new Error("Unexpected error occured");
        }
      }
    },
  });

  return {
    courseData,
    isLoading,
    isError,
    error,
  };
};
