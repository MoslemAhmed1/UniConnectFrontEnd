import api from "@/lib/axios";
import type { GlobalUser } from "@/types/user/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useProfileData = () => {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      try {
        const res = await api.get<GlobalUser>("/api/users/me");

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
