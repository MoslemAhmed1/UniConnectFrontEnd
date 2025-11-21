import type { CalendarEvent } from "@/types/student/calendar-event";

const useUpcomingEventsCount = (calendarEvents: CalendarEvent[] | undefined): number => {
  if (!calendarEvents) return 0;
  const now = Date.now();
  return calendarEvents.filter((event) => event.deadline_at >= now).length; // Ask wether calendar automatically removes events or not
};

export default useUpcomingEventsCount;

