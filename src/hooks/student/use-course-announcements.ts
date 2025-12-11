import api from "@/lib/axios";
import type { Announcement } from "@/types/student/announcement";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import openSocket from "socket.io-client";

export const useCourseAnnouncements = (courseCode: string | undefined) => {
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ["course-announcements", courseCode],
    queryFn: async () => {
      // TODO: handle fetching errors
      if (!courseCode) throw new Error("courseCode is undefined.");
      const result = await api.get(`/api/courses/${courseCode}/announcements`);
      return result.data.data;
    },
    initialData: [],
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    // TODO: handle fetching errors
    if (!courseCode) throw new Error("courseCode is undefined.");
    const socket = openSocket(import.meta.env.VITE_SERVER_URL);
    socket.on(`courses-${courseCode}-polls`, ({ data, action }) => {
      console.log(data, action);
      queryClient.setQueryData(
        ["course-announcements", courseCode],
        (announcements: Announcement[]) => {
          return announcements.map((announcement) => {
            if (announcement.type !== "poll") return announcement;

            const pollHasPollItemToBeToggled = announcement.pollItems.some(
              (pollItem) => pollItem.id === data.poll_item_id
            );

            if (!pollHasPollItemToBeToggled) return announcement;

            const toggledPollItemId = data.poll_item_id;

            // Change the votes count of the voted poll item
            const updatedPollItems = announcement.pollItems.map((pollItem) => {
              if (pollItem.id !== toggledPollItemId) return pollItem;

              let newVotersIds: string[] = [];

              if (action === "vote") {
                newVotersIds.push(data.voter_id);
              } else {
                newVotersIds = newVotersIds.filter(
                  (voterId) => voterId !== data.voter_id
                );
              }

              return {
                ...pollItem,
                votersIds: newVotersIds,
              };
            });

            return {
              ...announcement,
              pollItems: updatedPollItems,
            };
          });
        }
      );
    });

    return () => {
      socket.off(`courses-${courseCode}-polls`);
    };
  }, [courseCode, queryClient]);

  return {
    announcements,
    isLoading,
  };
};
