import { useMutation, useQuery } from "@tanstack/react-query";
import { type Notification } from "@/types/student/notification";

const useNotifications = () => {
  const { data: notifications } = useQuery<Notification[]>({
    queryKey: [],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              created_at: Date.now(),
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quo labore, facere deserunt consequuntur veniam numquam quas ipsum.",
              marked_as_read: false,
              source: "discussion_group",
              title: "New Project Deadline",
            },
            {
              created_at: Date.now() - 24 * 60 * 60 * 1000,
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quo labore, facere deserunt consequuntur veniam numquam quas ipsum.",
              marked_as_read: true,
              source: "course",
              title: "New Poll",
            },
          ]);
        }, 1000);
      });
    },
    initialData: [],
  });

  const { mutate: markAllAsRead } = useMutation({
    mutationFn: () => {
      return new Promise((resolve) => {
        resolve("Done");
        console.log("All messages have been marked as read.");
      });
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
