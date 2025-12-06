import { z } from "zod";

const addAnnouncementSchema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  type: z.enum(["announcement", "poll"])
});

type InferredAddAnnouncementFormSchema = z.infer<typeof addAnnouncementSchema>;

export { addAnnouncementSchema, type InferredAddAnnouncementFormSchema };
