import type { Assignment } from "@/types/student/assignment";
import { useQuery } from "@tanstack/react-query";

export const useAssignmentData = (assignmentId: string | null) => {
  const { data: assignment, isLoading } = useQuery<Assignment | null>({
    queryKey: ["student-assignments", assignmentId],
    queryFn: () => {
      return new Promise<Assignment | null>((resolve) => {
        setTimeout(() => {
          const fakeAssignment: Assignment =
            {
              id: "1",
              title: "Assignment 1 - Introduction to Signals",
              description: "Solve the problems in the attached PDF.",
              course_id: "CSE221",
              created_at: "2025-01-10T09:30:00Z",
              deadline_at: "2025-01-20T23:59:00Z",
              max_grade: 20,
              attached_files: [
                {
                  id: "1",
                  name: "assignment1.pdf",
                  type: "application/pdf",
                  key: "1",
                  size: "1.2 MB",
                  url: "https://fake-storage.com/files/assignment1.pdf",
                  uploaded_at: 1704880000,
                },
              ],
              assigner: {
                id: "1",
                first_name: "Ahmed",
                parent_name: "Hassan",
                grandparent_name: "Ibrahim",
                family_name: "Salem",
                email: "ahmed.hassan@university.edu",
                image_url: "https://placehold.co/100x100/png",
                role: "professor/ta",
              },
            }
          resolve(
            fakeAssignment.id === assignmentId ? fakeAssignment : null
          );
        }, 500);
      });
    },
    enabled: !!assignmentId,
  });

  return {
    assignment,
    isLoading,
  };
};