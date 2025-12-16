// // ==================== Fake Backend Call ==================== //

// import { useQuery } from "@tanstack/react-query";
// import type { Course } from "@/types/student/course";
// import type { User } from "@/types/user/user";

// const teacher: User[] = [
//   {
//     first_name: "Moslem",
//     parent_name: "Ahmed",
//     email: "m1@gmail.com",
//     id: "1",
//     role: "professor/ta",
//   },
// ];

// const fakeCourses: Course[] = [
//   {
//     code: "CS301",
//     name: "Database Systems",
//     year: "3",
//     image_url: "",
//     students_number: 120,
//     teachers: teacher,
//   },
//   {
//     code: "CS401",
//     name: "Design & Analysis of Algorithms",
//     year: "4",
//     image_url: "",
//     students_number: 95,
//     teachers: teacher,
//   },
//   {
//     code: "ECE301",
//     name: "Signals & Systems",
//     year: "3",
//     image_url: "",
//     students_number: 110,
//     teachers: teacher,
//   },
//   {
//     code: "CS302",
//     name: "Computer Networks",
//     year: "3",
//     image_url: "",
//     students_number: 105,
//     teachers: teacher,
//   },
//   {
//     code: "CS402",
//     name: "Software Engineering",
//     year: "4",
//     image_url: "",
//     students_number: 88,
//     teachers: teacher,
//   },
//   {
//     code: "CS501",
//     name: "Database Systems",
//     year: "3",
//     image_url: "",
//     students_number: 120,
//     teachers: teacher,
//   },
//   {
//     code: "CS601",
//     name: "Design & Analysis of Algorithms",
//     year: "4",
//     image_url: "",
//     students_number: 95,
//     teachers: teacher,
//   },
//   {
//     code: "ECE701",
//     name: "Signals & Systems",
//     year: "3",
//     image_url: "",
//     students_number: 110,
//     teachers: teacher,
//   },
//   {
//     code: "CS802",
//     name: "Computer Networks",
//     year: "3",
//     image_url: "",
//     students_number: 105,
//     teachers: teacher,
//   },
//   {
//     code: "CS902",
//     name: "Software Engineering",
//     year: "4",
//     image_url: "",
//     students_number: 88,
//     teachers: teacher,
//   },
//   {
//     code: "CS001",
//     name: "Database Systems",
//     year: "3",
//     image_url: "",
//     students_number: 120,
//     teachers: teacher,
//   },
//   {
//     code: "CS021",
//     name: "Design & Analysis of Algorithms",
//     year: "4",
//     image_url: "",
//     students_number: 95,
//     teachers: teacher,
//   },
//   {
//     code: "ECE331",
//     name: "Signals & Systems",
//     year: "3",
//     image_url: "",
//     students_number: 110,
//     teachers: teacher,
//   },
//   {
//     code: "CS342",
//     name: "Computer Networks",
//     year: "3",
//     image_url: "",
//     students_number: 105,
//     teachers: teacher,
//   },
//   {
//     code: "CS452",
//     name: "Software Engineering",
//     year: "4",
//     image_url: "",
//     students_number: 88,
//     teachers: teacher,
//   },
//   {
//     code: "CS361",
//     name: "Database Systems",
//     year: "3",
//     image_url: "",
//     students_number: 120,
//     teachers: teacher,
//   },
//   {
//     code: "CS481",
//     name: "Design & Analysis of Algorithms",
//     year: "4",
//     image_url: "",
//     students_number: 95,
//     teachers: teacher,
//   },
//   {
//     code: "ECE351",
//     name: "Signals & Systems",
//     year: "3",
//     image_url: "",
//     students_number: 110,
//     teachers: teacher,
//   },
//   {
//     code: "CS311",
//     name: "Computer Networks",
//     year: "3",
//     image_url: "",
//     students_number: 105,
//     teachers: teacher,
//   },
//   {
//     code: "CS412",
//     name: "Software Engineering",
//     year: "4",
//     image_url: "",
//     students_number: 88,
//     teachers: teacher,
//   },
//   {
//     code: "ECE131",
//     name: "Signals & Systems",
//     year: "3",
//     image_url: "",
//     students_number: 110,
//     teachers: teacher,
//   },
//   {
//     code: "CS314",
//     name: "Computer Networks",
//     year: "3",
//     image_url: "",
//     students_number: 105,
//     teachers: teacher,
//   },
//   {
//     code: "CS461",
//     name: "Software Engineering",
//     year: "4",
//     image_url: "",
//     students_number: 88,
//     teachers: teacher,
//   },
// ];

// type UseStudentCoursesParams = {
//   page?: number;
//   perPage?: number;
//   search?: string;
// };

// type PaginatedCoursesResponse = {
//   data: Course[];
//   total: number;
//   page: number;
//   perPage: number;
// };

// export const useStudentCourses = (params: UseStudentCoursesParams = {}) => {
//   const { page = 1, perPage = 10, search = "" } = params;

//   return useQuery<PaginatedCoursesResponse>({
//     queryKey: ["student-courses", page, perPage, search],
//     queryFn: async () => {
//       await new Promise((res) => setTimeout(res, 500));

//       // search
//       const filtered = fakeCourses.filter((c) =>
//         c.name.toLowerCase().includes(search.toLowerCase())
//       );

//       // pagination
//       const start = (page - 1) * perPage;
//       const end = start + perPage;
//       const paginated = filtered.slice(start, end);

//       return {
//         data: paginated,
//         total: filtered.length,
//         page,
//         perPage,
//       };
//     },
//   });
// };

// ==================== Real Backend Call ==================== //
// import { useQuery } from "@tanstack/react-query";
// import type { Course } from "@/types/student/course";
// import api from "@/lib/axios";

// type UseStudentCoursesParams = {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   enablePagination?: boolean; // Optional flag to enable/disable pagination
// };

// type PaginatedCoursesResponse = {
//   data: Course[];
//   total: number;
//   page: number;
//   perPage: number;
// };

// export const useStudentCourses = (
//   params: UseStudentCoursesParams = {}
// ) => {
//   const {
//     page = 1,
//     perPage = 10,
//     search = "",
//     enablePagination = true
//   } = params;

//   return useQuery<PaginatedCoursesResponse>({
//     queryKey: ["student-courses", page, perPage, search, enablePagination],
//     queryFn: async () => {
//       // Build query parameters
//       const queryParams = new URLSearchParams();

//       if (enablePagination) {
//         queryParams.append("page", page.toString());
//         queryParams.append("per_page", perPage.toString());
//       }

//       if (search) {
//         queryParams.append("search", search);
//       }

//       // Make API call
//       const response = await api.get(
//         `/api/student/courses?${queryParams.toString()}`
//       );

//       // If pagination is disabled, return all data with default pagination structure
//       if (!enablePagination) {
//         return {
//           data: response.data.data || response.data,
//           total: response.data.data?.length || response.data.length || 0,
//           page: 1,
//           perPage: response.data.data?.length || response.data.length || 0,
//         };
//       }

//       // Return paginated response
//       return {
//         data: response.data.data,
//         total: response.data.total,
//         page: response.data.page,
//         perPage: response.data.per_page,
//       };
//     },
//   });
// };

// Example usage for paginated lists:
// const { data } = useStudentCourses({ page: 1, perPage: 10, search: "Database" });

// Example usage for non-paginated lists (get all courses):
// const { data } = useStudentCourses({ enablePagination: false });

// Example usage with just search:
// const { data } = useStudentCourses({ search: "CS", enablePagination: false });

// ====================================================================================== //

// ==================== Older Hooks ==================== //

// import type { Course } from "@/types/student/course";
// import { useQuery } from "@tanstack/react-query";
// import type { User } from "@/types/user/user";

// const teacher: User[] = [
//   {
//     first_name: "Moslem", parent_name: "Ahmed", email: "m1@gmail.com", id: "1", role: "professor/ta"
//   }
// ]

// export const useStudentCourses = () => {
//   const { data: courses, isLoading: isLoadingCourse } = useQuery<Course[]>({
//     queryKey: ["student-courses"],
//     queryFn: () => {
//       // Simulate a backend call
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const fakeCourses: Course[] = [
//             { code: "CS301", name: "Database Systems", year: "3", image_url: "", students_number: 120, teachers: teacher },
//             { code: "CS401", name: "Design & Analysis of Algorithms", year: "4", image_url: "", students_number: 95, teachers: teacher },
//             { code: "ECE301", name: "Signals & Systems", year: "3", image_url: "", students_number: 110, teachers: teacher },
//             { code: "CS302", name: "Computer Networks", year: "3", image_url: "", students_number: 105, teachers: teacher },
//             { code: "CS402", name: "Software Engineering", year: "4", image_url: "", students_number: 88, teachers: teacher },
//           ];

//           resolve(fakeCourses);
//         }, 700);
//       });
//     },
//     initialData: [],
//   });

//   return {
//     courses,
//     isLoadingCourse,
//   };
// };

import api from "@/lib/axios";
import type { Course } from "@/types/student/course";
import { useQuery } from "@tanstack/react-query";

export const useStudentCourses = () => {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["student-courses"],
    queryFn: async () => {
      const result = await api.get("/api/users/courses");

      return result.data.data;
    },
    initialData: [],
  });

  return {
    courses,
    isLoading,
  };
};
