import { z } from "zod";

const addEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string(),
});

type InferredAddEventFormSchema = z.infer<typeof addEventSchema>;

export { addEventSchema, type InferredAddEventFormSchema };