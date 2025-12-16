import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user/user";
import type { serverRolesType } from "@/types/api/auth";

interface GetUsersParams {
  page: number;
  perPage: number;
  search?: string;
  roleFilter?: serverRolesType | "all" | null;
  yearFilter?: string;
}

interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Fake Backend Call
export const useGetUsers = (params: GetUsersParams) => {
  const { data, isLoading: isLoadingUsers } = useQuery<GetUsersResponse>({
    queryKey: ["get-users", params],
    queryFn: async () => {
      return new Promise<GetUsersResponse>((resolve) => {
        setTimeout(() => {
          const fakeUsers: User[] = [
            { id: "1", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed@uni.edu", role: "student", code: "91240001", year: "3" },
            { id: "2", first_name: "Sarah", parent_name: "Johnson", email: "sarah@uni.edu", role: "professor/ta" },
            { id: "3", first_name: "Omar", parent_name: "Ali", email: "omar@uni.edu", role: "class_representative", code: "91240002", year: "2" },
            { id: "4", first_name: "Admin", parent_name: "User", email: "admin@uni.edu", role: "system_admin" },
            { id: "5", first_name: "Marwan", parent_name: "Hassan", email: "marwan@uni.edu", role: "course_head", code: "91240003", year: "4" },
            { id: "6", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed@uni.edu", role: "student", code: "91240001", year: "3" },
            { id: "7", first_name: "Sarah", parent_name: "Johnson", email: "sarah@uni.edu", role: "professor/ta" },
            { id: "8", first_name: "Omar", parent_name: "Ali", email: "omar@uni.edu", role: "class_representative", code: "91240002", year: "2" },
            { id: "9", first_name: "Admin", parent_name: "User", email: "admin@uni.edu", role: "system_admin" },
            { id: "10", first_name: "Marwan", parent_name: "Hassan", email: "marwan@uni.edu", role: "course_head", code: "91240003", year: "4" },
            { id: "11", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed@uni.edu", role: "student", code: "91240001", year: "3" },
            { id: "12", first_name: "Sarah", parent_name: "Johnson", email: "sarah@uni.edu", role: "professor/ta" },
            { id: "13", first_name: "Omar", parent_name: "Ali", email: "omar@uni.edu", role: "professor/ta", code: "91240002", year: "2" },
            { id: "14", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed@uni.edu", role: "professor/ta", code: "91240001", year: "3" },
            { id: "15", first_name: "Sarah", parent_name: "Johnson", email: "sarah@uni.edu", role: "professor/ta" },
            { id: "16", first_name: "Omar", parent_name: "Ali", email: "omar@uni.edu", role: "professor/ta", code: "91240002", year: "2" },
            { id: "17", first_name: "Ahmed", parent_name: "Mohamed", email: "ahmed@uni.edu", role: "professor/ta", code: "91240001", year: "3" },
            { id: "18", first_name: "Sarah", parent_name: "Johnson", email: "sarah@uni.edu", role: "professor/ta" },
            { id: "19", first_name: "Omar", parent_name: "Ali", email: "omar@uni.edu", role: "professor/ta", code: "91240002", year: "2" },
          ];

          // Apply filters (simulating backend filtering)
          let filteredUsers = fakeUsers.filter(u => {
            const matchesSearch = params.search
              ? `${u.first_name} ${u.parent_name}`.toLowerCase().includes(params.search.toLowerCase())
              : true;
            const matchesRole = params.roleFilter === "all" || !params.roleFilter || u.role === params.roleFilter;
            const matchesYear = params.yearFilter === "all" || !params.yearFilter || u.year === params.yearFilter;
            return matchesSearch && matchesRole && matchesYear;
          });

          const total = filteredUsers.length;
          const totalPages = Math.ceil(total / params.perPage);
          
          // Apply pagination (simulating backend pagination)
          const startIndex = (params.page - 1) * params.perPage;
          const endIndex = startIndex + params.perPage;
          const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

          resolve({
            users: paginatedUsers,
            total,
            page: params.page,
            perPage: params.perPage,
            totalPages,
          });
        }, 700);
      });
    },
  });

  return {
    users: data?.users || [],
    total: data?.total || 0,
    page: data?.page || 1,
    perPage: data?.perPage || 6,
    totalPages: data?.totalPages || 0,
    isLoadingUsers,
  };
};

// Backend Call
// import api from "@/lib/axios";
// 
// export const useGetUsers = (params: GetUsersParams) => {
//   const { data, isLoading: isLoadingUsers } = useQuery<GetUsersResponse>({
//     queryKey: ["get-users", params],
//     queryFn: async () => {
//       const result = await api.get("/api/users", {
//         params: {
//           page: params.page,
//           per_page: params.perPage,
//           search: params.search,
//           role: params.roleFilter !== "all" ? params.roleFilter : undefined,
//           year: params.yearFilter !== "all" ? params.yearFilter : undefined,
//         },
//       });
//       return result.data.data;
//     },
//   });
//
//   return {
//     users: data?.users || [],
//     total: data?.total || 0,
//     page: data?.page || 1,
//     perPage: data?.perPage || 6,
//     totalPages: data?.totalPages || 0,
//     isLoadingUsers,
//   };
// };