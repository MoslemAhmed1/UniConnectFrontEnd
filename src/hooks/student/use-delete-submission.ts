import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteSubmission = (submissionId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteSubmission, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-submission"],
    mutationFn: async (submissionId: string) => {
      return api.delete(`/api/submissions/${submissionId}`);
    },
    onSuccess: () => {
      toast.success("Submission has been deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["student-submissions", submissionId] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("An error occurred while deleting this submission. Please try again.");
    },
  });

  const handleDeleteSubmission = async (submissionId: string) => {
    try {
      await deleteSubmission(submissionId);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleDeleteSubmission,
    isDeleting,
  };
};
