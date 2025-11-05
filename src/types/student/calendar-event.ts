type CalendarEvent = {
  deadline_at: number; // Time since epoch in ms
  stringified_notes: string; // HTML stored as text in the DB and will be parsed on the frontend, it's done like this to allow links along with text
  title: string;
  type: CalendarEventType;
};

type CalendarEventType = "quiz" | "exam" | "poll" | "project" | "assignment";

export { type CalendarEvent, type CalendarEventType };
