import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  assignmentFormSchema,
  type InferredAssignmentFormSchema,
} from "@/validations/AssignmentFormSchema";

type UseAssignmentFormArgs = {
  mode: "create" | "edit";
  courseCode?: string;
  assignmentId?: number;
  defaultValues?: Partial<InferredAssignmentFormSchema>;
};

export const useAssignmentForm = ({ mode, courseCode, assignmentId, defaultValues }: UseAssignmentFormArgs) => {
  const queryClient = useQueryClient();

  const form = useForm<InferredAssignmentFormSchema>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      dueDate: defaultValues?.dueDate ?? "",
      dueTime: defaultValues?.dueTime ?? "",
      attachedFiles: defaultValues?.attachedFiles ?? undefined, // TODO: replace this with the correct value
    },
    mode: "onBlur",
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form;

  // TODO: handle attaching multiple files
  const mutation = useMutation({
    mutationKey: ["assignment", mode, assignmentId],
    mutationFn: async (values: InferredAssignmentFormSchema) => {
      const newAssignment = {
        title: values.title,
        description: values.description,
        deadline_at: new Date(`${values.dueDate}T${values.dueTime}`).getTime(),
        course_code: courseCode,
        attached_files: values.attachedFiles,
      };

      if (mode === "create") {
        return api.post("/api/assignments", newAssignment);
      } else {
        if (!assignmentId) throw new Error("Assignment ID is required for edit.");
        return api.put(`/api/assignments/${assignmentId}`, newAssignment);
      }
    },
    onSuccess: () => {
      toast.success(`Assignment has been ${mode === "create" ? "created" : "updated"} successfully.`);

      queryClient.invalidateQueries({ queryKey: ["assignments", courseCode] });

      if (mode === "create") {
        reset({
          title: "",
          description: "",
          dueDate: "",
          dueTime: "",
          attachedFiles: undefined,
        });
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error(
        `An error occurred while ${mode === "create" ? "adding" : "updating"} this assignment. Please try again.`
      );
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return {
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    onSubmit,
  };
};