import api from "@/lib/axios";
import type { StudentUser } from "@/types/student/student-user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useStudentProfileData = () => {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["student-profile-data"],
    queryFn: async () => {
      try {
        const res = await api.get<StudentUser>("/api/users/me");

        if (!res.data.family_name) res.data.family_name = "";
        if (!res.data.grandparent_name) res.data.grandparent_name = "";

        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data && "message" in err.response.data) {
            const message = err.response.data.message;
            toast.error(message);
            return;
          }

          toast.error("Unexpected error occurred.");
        }
      }
    },
  });

  return {
    profileData,
    isLoading,
  };
};

export { useStudentProfileData };
