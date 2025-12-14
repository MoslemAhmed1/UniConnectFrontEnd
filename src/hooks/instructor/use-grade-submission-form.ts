import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { toast } from "sonner";

import { gradeFormSchema, type InferredGradeFormSchema } from "@/validations/GradeFormSchema";
import type { Submission } from "@/types/student/submission";

type UseGradeSubmissionFormArgs = {
  mode: "create" | "edit";
  submissionId: string;
  assignmentId?: string;
  defaultValues?: Partial<InferredGradeFormSchema>;
};

export const useGradeSubmissionForm = ({
  mode,
  submissionId,
  assignmentId,
  defaultValues,
}: UseGradeSubmissionFormArgs) => {
  const queryClient = useQueryClient();

  const form = useForm<InferredGradeFormSchema>({
    resolver: zodResolver(gradeFormSchema),
    defaultValues: {
      grade: defaultValues?.grade ?? undefined,
      feedback: defaultValues?.feedback ?? "",
    },
    mode: "onBlur",
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form;

  const mutation = useMutation({
    mutationKey: ["submission-grade", mode, submissionId],
    mutationFn: async (values: InferredGradeFormSchema) => {
      const newSubmissionGrade = {
        grade: Number(values.grade),
        feedback: values.feedback,
      };

      if (mode === "create") {
        return api.post<Submission>(`/api/submissions/${submissionId}/grade`, newSubmissionGrade);
      } else {
        if (!submissionId) throw new Error("Submission ID is required for edit.");
        return api.put<Submission>(`/api/submissions/${submissionId}/grade`, newSubmissionGrade);
      }
    },
    onSuccess: () => {
      toast.success(`Grade has been ${mode === "create" ? "added" : "updated"} successfully.`);
      
      if (assignmentId) {
        queryClient.invalidateQueries({ queryKey: ["student-submissions", assignmentId] });
      } 

      if (mode === "create") {
        reset({ grade: undefined, feedback: undefined });
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error(`An error occurred while ${mode === "create" ? "adding" : "updating"} the grade. Please try again.`);
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return {
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    onSubmit,
  };
};