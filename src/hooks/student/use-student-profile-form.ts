import type { StudentUser } from "@/types/student/student-user";
import {
  type InferedStudentProfileSchema,
  StudentProfileFormSchema,
} from "@/validations/StudentProfileFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

const useStudentProfileForm = (studentData: StudentUser) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferedStudentProfileSchema>({
    resolver: zodResolver(StudentProfileFormSchema),
    defaultValues: studentData,
  });

  const onSubmit: SubmitHandler<InferedStudentProfileSchema> = (data) => {
    console.log(data);
  };

  return {
    register,
    onFormSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export { useStudentProfileForm };
