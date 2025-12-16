import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user/user";
// import api from "@/lib/axios";

// Fake Backend Call
export const useGetCourseUsers = (courseCode: string | undefined) => {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["course-users", courseCode],
    queryFn: async () => {
      if (!courseCode) return [];
      
      // Simulate API call
      return new Promise<User[]>((resolve) => {
        setTimeout(() => {
          const fakeUsers: User[] = [
            { id: "1", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed@uni.edu", role: "student", code: "91240001", year: "3" },
            { id: "2", first_name: "Sarah", parent_name: "Johnson", email: "sarah@uni.edu", role: "professor/ta" },
            { id: "3", first_name: "Omar", parent_name: "Ali", email: "omar@uni.edu", role: "class_representative", code: "91240002", year: "2" },
            { id: "5", first_name: "Marwan", parent_name: "Hassan", email: "marwan@uni.edu", role: "course_head", code: "91240003", year: "4" },
            { id: "6", first_name: "Fatima", parent_name: "Ahmed", email: "fatima@uni.edu", role: "student", code: "91240004", year: "3" },
            { id: "13", first_name: "Omar", parent_name: "Ali", email: "omar2@uni.edu", role: "professor/ta", code: "91240002", year: "2" },
            { id: "14", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed2@uni.edu", role: "professor/ta", code: "91240001", year: "3" },
          ];
          resolve(fakeUsers);
        }, 500);
      });
    },
    enabled: !!courseCode,
  });

  return {
    users: users || [],
    isLoading,
  };
};

// Backend Call
// export const useGetCourseUsers = (courseCode: string | undefined) => {
//   const { data, isLoading } = useQuery<User[]>({
//     queryKey: ["course-users", courseCode],
//     queryFn: async () => {
//       if (!courseCode) return [];
//       const result = await api.get(`/api/courses/${courseCode}/users`);
//       return result.data.data;
//     },
//     enabled: !!courseCode,
//   });
//
//   return {
//     users: data || [],
//     isLoading,
//   };
// };

