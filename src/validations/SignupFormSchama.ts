import { YEARS } from "@/constants/student/student";
import { SELECTABLE_ROLES } from "@/constants/user/role";
import * as z from "zod";

const signupFormSchema = z
  .object({
    email: z.email("Please enter a valid email."),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long."),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(2, "First name should be at least 2 characters long."),
    parentName: z
      .string()
      .min(2, "Second name should be at least 2 characters long."),
    role: z.enum(
      SELECTABLE_ROLES.map((role) => role.toLowerCase()),
      {
        error: "Please select a role.",
      }
    ),
    year: z.enum(YEARS).optional(),
    studentCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password and Confirm Password do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.role !== "student" || data.year, {
    error: "Year is required for students.",
    path: ["year"],
  })
  .refine((data) => data.role !== "student" || data.studentCode, {
    error: "Code is required for students.",
    path: ["studentCode"],
  });

type InferedFormSchema = z.infer<typeof signupFormSchema>;

export { signupFormSchema, type InferedFormSchema };
