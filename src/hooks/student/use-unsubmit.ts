import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUnsubmit = (submissionId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync: unSubmit, isPending: isUnsubmitting } = useMutation({
    mutationKey: ["unsubmit"],
    mutationFn: async (submissionId: string) => {
      return api.put(`/api/submissions/${submissionId}`);
    },
    onSuccess: () => {
      toast.success("Submission has been unsubmitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["student-submissions", submissionId] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("An error occurred while unsubmitting this submission. Please try again.");
    },
  });

  const handleUnsubmit = async (submissionId: string) => {
    try {
      await unSubmit(submissionId);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleUnsubmit,
    isUnsubmitting,
  };
};
