import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAssignment, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-assignment"],
    mutationFn: async (assignmentId: number) => {
      return api.delete(`/api/assignments/${assignmentId}`);
    },
    onSuccess: () => {
      toast.success("Assignment has been deleted successfully.");
      
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("An error occurred while deleting this assignment. Please try again.");
    },
  });

  const handleDeleteAssignment = async (assignmentId: number) => {
    try {
      await deleteAssignment(assignmentId);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleDeleteAssignment,
    isDeleting,
  };
};
