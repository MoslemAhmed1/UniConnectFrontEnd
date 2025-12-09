import { z } from "zod";

const eventFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  notes: z.string(),
  dueDate: z.string().nonempty("Due date is required"),
  dueTime: z.string().nonempty("Due time is required"),
  type: z.enum(["quiz", "exam", "poll", "project", "assignment", "lab_exam"]),
  courseCode: z.string().nonempty("Course is required"),
});

type InferredEventFormSchema = z.infer<typeof eventFormSchema>;

export { eventFormSchema, type InferredEventFormSchema };

