import * as z from "zod";

const materialFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  folder: z.enum(["lecture", "sheet", "quiz", "assignment", "tutorial", "textbook"]),
  // file: z.instanceof(File, { error: "A file must be uploaded." })
  file: z.any()
});

type InferredMaterialFormSchema = z.infer<typeof materialFormSchema>;

export { materialFormSchema, type InferredMaterialFormSchema };