import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  addAssignmentSchema,
  type InferredAddAssignmentFormSchema,
} from "@/validations/AddAssignmentFormSchema";

import type { Assignment } from "@/types/student/assignment";

type UseAddAssignmentFormArgs = {
  courseCode?: string;
  defaultValues?: Partial<InferredAddAssignmentFormSchema>;
};

export const useAddAssignmentForm = ({ courseCode, defaultValues }: UseAddAssignmentFormArgs) => {
  const form = useForm<InferredAddAssignmentFormSchema>({
    resolver: zodResolver(addAssignmentSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      dueDate: defaultValues?.dueDate ?? "",
      dueTime: defaultValues?.dueTime ?? "",
    },
    mode: "onBlur",
  });

  const {
    register,
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form;

  // TODO: handle attaching multiple files
  const onSubmit = handleSubmit(async (values) => {
    try {
      const newAssignment = {
        title: values.title,
        description: values.description,
        deadline_at: new Date(`${values.dueDate}T${values.dueTime}`).getTime(),
        courseCode,
      };

      await api.post<Assignment>("/api/assignments", newAssignment);

      toast.success("Assignment has been created successfully.");

      reset({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating this assignment. Please try again.");
    }
  });

  return {
    register,
    control,
    isSubmitting,
    onSubmit,
  };
};