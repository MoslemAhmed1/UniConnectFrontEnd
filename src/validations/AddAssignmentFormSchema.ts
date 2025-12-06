import { z } from "zod";

const addAssignmentSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  dueDate: z.string().nonempty("Due date is required"),
  dueTime: z.string().nonempty("Due time is required"),
  // File inputs from browsers are FileList objects; accept any for flexibility
  attachedFiles: z.any().optional(),
});

type InferredAddAssignmentFormSchema = z.infer<typeof addAssignmentSchema>;

export { addAssignmentSchema, type InferredAddAssignmentFormSchema };