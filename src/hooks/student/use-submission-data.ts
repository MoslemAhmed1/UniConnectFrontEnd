import type { Submission } from "@/types/student/submission";
import { useQuery } from "@tanstack/react-query";

export const useSubmissionData = (assignmentId: string) => {
  const { data: submission, isLoading } = useQuery<Submission | null>({
    queryKey: ["student-submission", assignmentId],
    queryFn: () => {
      return new Promise<Submission | null>((resolve) => {
        setTimeout(() => {
          const now = Date.now();
          const fakeSubmission: Submission =
            {
              id: "1",
              assignment_id: "1",
              submitted_at: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
              grade: 18,
              feedback: "Excellent Work",
              status: "graded",
              attached_files: [
                {
                  id: "1",
                  name: "Assignment1_Solution.pdf",
                  type: "application/pdf",
                  size: "1.2 MB",
                  key: "file-1",
                  url: "",
                  uploaded_at: now - 2 * 24 * 60 * 60 * 1000,
                },
                {
                  id: "2",
                  name: "Assignment2_Solution.pdf",
                  type: "application/pdf",
                  size: "4.0 MB",
                  key: "file-2",
                  url: "",
                  uploaded_at: now - 2 * 24 * 60 * 60 * 1000,
                },
              ],
              submitter: {
                id: "1",
                first_name: "Mohamed",
                parent_name: "Ali",
                grandparent_name: "Ibrahim",
                family_name: "Salem",
                email: "mohamed.ali@university.edu",
                image_url: "https://placehold.co/100x100/png",
                role: "student",
              },
            }
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