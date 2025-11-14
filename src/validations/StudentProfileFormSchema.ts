import * as z from "zod";

const StudentProfileFormSchema = z.object({
  firstName: z.string().nonempty("You must enter a first name"),
  parentName: z.string().nonempty("You must enter a parent name"),
  grandparentName: z.string().nonempty("You must enter a grandparent name"),
  familyName: z.string().nonempty("You must enter a family name"),
  email: z.email(),
});

type InferedStudentProfileSchema = z.infer<typeof StudentProfileFormSchema>;

export { StudentProfileFormSchema, type InferedStudentProfileSchema };
