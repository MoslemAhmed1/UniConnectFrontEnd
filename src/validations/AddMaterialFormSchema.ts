import { z } from "zod";

const addMaterialSchema = z.object({
  title: z.string().nonempty("Title is required"),
  folder: z.enum(["lecture", "sheet", "quiz", "assignment", "tutorial", "textbook"]),
  file: z.instanceof(File, { error: "A file must be uploaded." })
});

type InferredAddMaterialFormSchema = z.infer<typeof addMaterialSchema>;

export { addMaterialSchema, type InferredAddMaterialFormSchema };