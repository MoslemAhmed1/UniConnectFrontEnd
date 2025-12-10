import { z } from "zod";

const addMaterialSchema = z.object({
  title: z.string().nonempty("Title is required"),
  folder: z.enum([
    "lecture",
    "sheet",
    "quiz",
    "assignment",
    "tutorial",
    "textbook",
  ]),
  file_id: z.string().nonempty("A file must be provided."),
});

type InferredAddMaterialFormSchema = z.infer<typeof addMaterialSchema>;

export { addMaterialSchema, type InferredAddMaterialFormSchema };
