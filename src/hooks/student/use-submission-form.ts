import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  submissionFormSchema,
  type InferredSubmissionFormSchema,
} from "@/validations/SubmissionFormSchema";
import { useEffect, useState } from "react";
import type { Submission } from "@/types/student/submission";
import type { File } from "@/types/student/file";

type UseSubmissionFormArgs = {
  mode: "create" | "edit";
  assignmentId: string;
  submissionId?: string;
  submissionData?: Submission;
};

type UploadFile = {
  id: string;
  key: string;
  name: string;
  size: string;
};

export const useSubmissionForm = ({
  mode,
  assignmentId,
  submissionId,
  submissionData,
}: UseSubmissionFormArgs) => {
  const queryClient = useQueryClient();

  // Keep track of chosen files (uploaded file records)
  const [chosenFiles, setChosenFiles] = useState<UploadFile[] | undefined>(
    () =>
      (submissionData?.attached_files || []).map((f: File) => ({
        id: String(f.id),
        key: f.key,
        name: f.name,
        size: f.size,
      })) ?? []
  );

  useEffect(() => {
    if (submissionData) {
      setChosenFiles(
        (submissionData.attached_files || []).map((f: File) => ({
          id: f.id,
          key: f.key,
          name: f.name,
          size: f.size,
        }))
      );
    }
  }, [submissionData]);

  const form = useForm<InferredSubmissionFormSchema>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      file_ids: submissionData?.attached_files?.map((f) => String(f.id)) ?? undefined,
    },
    mode: "onBlur",
  });

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    reset,
    setValue,
    trigger,
  } = form;

  const mutation = useMutation({
    mutationKey: ["submission", mode, submissionId],
    mutationFn: async (values: InferredSubmissionFormSchema) => {
      const newSubmission = {
        assignment_id: assignmentId,
        file_ids: values.file_ids,
      };

      if (mode === "create") {
        return api.post<Submission>("/api/submissions", newSubmission);
      } else {
        if (!submissionId) throw new Error("Submission ID is required for edit.");
        return api.put<Submission>(`/api/submissions/${submissionId}`, newSubmission);
      }
    },
    onSuccess: () => {
      toast.success(`Submission has been ${mode === "create" ? "created" : "updated"} successfully.`);

      // invalidate submissions for this assignment
      queryClient.invalidateQueries({ queryKey: ["student-submissions", assignmentId] });

      if (mode === "create") {
        reset({
          file_ids: undefined,
        });
        setChosenFiles(undefined);
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error(`An error occurred while ${mode === "create" ? "creating" : "updating"} this submission. Please try again.`);
    },
  });

  const { mutateAsync: deleteFile, isPending: isDeletingFile } = useMutation({
    mutationKey: ["delete-file"],
    mutationFn: (fileId: string) => {
      return api.delete(`/api/files/${fileId}`);
    },
    onSuccess: () => {
      if(!chosenFiles) return;
      toast.success(`File has been deleted successfully.`);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("An error occurred while deleting the file. Please try again.");
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  const chooseFiles = (files: UploadFile[]) => {
    const ids = files.map((f) => f.id);
    setChosenFiles(files);
    setValue("file_ids", ids);
    trigger("file_ids");
  };

  const handleRemoveChosenFile = async (fileId: string) => {
    if(isDeletingFile || !chosenFiles) return;

    await deleteFile(fileId);

    setChosenFiles((prev) => {
      const updated = (prev ?? []).filter((f) => f.id !== fileId);
      setValue("file_ids", updated.map((f) => f.id));
      return updated;
    });
  };

  return {
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    onSubmit,
    chooseFiles,
    chosenFiles,
    isValid,
    handleRemoveChosenFile,
    isDeletingFile,
  };
};
