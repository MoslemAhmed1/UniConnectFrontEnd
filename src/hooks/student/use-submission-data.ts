import type { Submission } from "@/types/student/submission";
import { useQuery } from "@tanstack/react-query";

export const useSubmissionData = (assignmentId: string) => {
  const { data: submission, isLoading } = useQuery<Submission | null>({
    queryKey: ["student-submission", assignmentId],
    queryFn: () => {
      return new Promise<Submission | null>((resolve) => {
        setTimeout(() => {
          const fakeSubmission: Submission =
            {
              id: "sub-1",
              assignment_id: "A1",
              submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              grade: 18,
              status: "graded",
              submitter: {
                id: "S1",
                first_name: "Mohamed",
                parent_name: "Ali",
                grandparent_name: "Ibrahim",
                family_name: "Salem",
                email: "mohamed.ali@university.edu",
                image_url: "https://placehold.co/100x100/png",
                role: "student",
              },
              attached_files: [
                {
                  id: "1",
                  name: "Assignment1_Solution.pdf",
                  type: "application/pdf",
                  size: "1.2 MB",
                  key: "1",
                  url: "",
                  uploaded_at: Date.now() - 2 * 24 * 60 * 60 * 1000,
                },
              ],
            };
          resolve(
            fakeSubmission.assignment_id === assignmentId ? fakeSubmission : null
          );
        }, 500);
      });
    },
    enabled: !!assignmentId,
  });

  return {
    submission,
    isLoading,
  };
};