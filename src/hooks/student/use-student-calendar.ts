import type { CalendarEvent } from "@/types/student/calendar-event";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStudentCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { data: calendarEvents, isLoading } = useQuery<CalendarEvent[]>({
    queryKey: ["calendar-events"],
    queryFn: () => {
      // Simulate a backend call until we get the backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeData: CalendarEvent[] = [
            {
              deadline_at: Date.now() + 24 * 60 * 60 * 1000,
              stringified_notes:
                "<p>Let's do this <a target='_blank' style='color: blue; text-decoration: underline;' href='https://www.amazon.com'>Visit me</a></p>",
              title: "Computer Architecture Deadline",
              type: "project",
            },
            {
              deadline_at: Date.now() + 24 * 60 * 60 * 1000,
              stringified_notes:
                "<p>Let's do this <a target='_blank' style='color: blue; text-decoration: underline;' href='https://www.amazon.com'>Visit me</a></p>",
              title: "Computer Architecture Deadline",
              type: "project",
            },
            {
              deadline_at: Date.now() + 2 * 24 * 60 * 60 * 1000,
              stringified_notes:
                "<p>Let's do this <a target='_blank' style='color: blue; text-decoration: underline;' href='https://www.amazon.com'>Visit me</a></p>",
              title: "Probability Assignment",
              type: "assignment",
            },
          ];

          resolve(fakeData);
        }, 1000);
      });
    },
    initialData: [],
  });

  return {
    date,
    setDate,
    calendarEvents,
    isLoading,
  };
};
