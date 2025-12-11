import * as z from "zod";

const assignmentFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
  dueTime: z.string().min(1, "Due time is required"),
  attachedFiles: z.any().optional() // not sure
});

type InferredAssignmentFormSchema = z.infer<typeof assignmentFormSchema>;

export { assignmentFormSchema, type InferredAssignmentFormSchema };