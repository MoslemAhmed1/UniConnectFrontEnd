import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Notification } from "@/types/student/notification";
import api from "@/lib/axios";
import { useAuth } from "@/providers/context/authContext";

const useNotifications = () => {
  const { auth, loading: isAuthLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!auth.user?.id) {
        throw new Error("You must be signed in to perform this operation.");
      }

      const result = await api.get(`/api/notifications`);
      return result.data.data;
    },
    initialData: [],
    enabled: !isAuthLoading,
  });

  const { mutate: markAllAsRead } = useMutation({
    mutationFn: () => {
      if (!auth.user?.id) {
        throw new Error("You must be signed in to perform this operation.");
      }

      queryClient.setQueryData(
        ["notifications"],
        (notifications: Notification[]) =>
          notifications.map((notification) => ({
            ...notification,
            marked_as_read: true,
          }))
      );

      return api.patch(`/api/notifications`);
    },
  });

  const unreadNotificationsCount = notifications.reduce(
    (total, notification) => total + Number(!notification.marked_as_read),
    0
  );

  return {
    unreadNotificationsCount,
    markAllAsRead: () => markAllAsRead(),
    notifications,
  };
};

export default useNotifications;
