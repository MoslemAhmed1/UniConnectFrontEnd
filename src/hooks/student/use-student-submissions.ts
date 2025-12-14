import type { Submission } from "@/types/student/submission";
import { useQuery } from "@tanstack/react-query";

export const useStudentSubmissions = (assignmentId: string | null) => {
  const { data: submissions, isLoading } = useQuery<Submission[]>({
    queryKey: ["student-submissions", assignmentId],
    queryFn: () => {
      return new Promise<Submission[]>((resolve) => {
        setTimeout(() => {
          const now = Date.now();

          const fakeSubmissions: Submission[] = [
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
            },
            {
              id: "2",
              assignment_id: "1",
              submitted_at: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
              // no grade yet
              status: "submitted",
              attached_files: [
                {
                  id: "2",
                  name: "Assignment1_Code.zip",
                  type: "application/pdf",
                  size: "3.4 MB",
                  key: "file-2",
                  url: "",
                  uploaded_at: now - 1 * 24 * 60 * 60 * 1000,
                },
              ],
              submitter: {
                id: "2",
                first_name: "Ahmed",
                parent_name: "Hassan",
                grandparent_name: "Omar",
                family_name: "Nabil",
                email: "ahmed.hassan@university.edu",
                image_url: "https://placehold.co/100x100/png",
                role: "student",
              },
            },
            {
              id: "3",
              assignment_id: "1",
              submitted_at: new Date(now - 12 * 60 * 60 * 1000).toISOString(),
              grade: 15,
              status: "graded",
              attached_files: [
                {
                  id: "3",
                  name: "Assignment1_Report.docx",
                  type: "application/pdf",
                  size: "900 KB",
                  key: "file-3",
                  url: "",
                  uploaded_at: now - 12 * 60 * 60 * 1000,
                },
              ],
              submitter: {
                id: "3",
                first_name: "Sara",
                parent_name: "Mahmoud",
                grandparent_name: "Khaled",
                family_name: "Salem",
                email: "sara.mahmoud@university.edu",
                image_url: "https://placehold.co/100x100/png",
                role: "student",
              },
            },
            {
              id: "4",
              assignment_id: "1",
              submitted_at: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
              // no grade
              status: "submitted",
              attached_files: [
                {
                  id: "4",
                  name: "Assignment1_Extra.pdf",
                  type: "application/pdf",
                  size: "2.0 MB",
                  key: "file-4",
                  url: "",
                  uploaded_at: now - 3 * 24 * 60 * 60 * 1000,
                },
              ],
              submitter: {
                id: "4",
                first_name: "Nora",
                parent_name: "Samir",
                grandparent_name: "Tarek",
                family_name: "Fahmy",
                email: "nora.samir@university.edu",
                image_url: "https://placehold.co/100x100/png",
                role: "student",
              },
            },
          ];

          // If assignmentId is provided, return fake submissions for it; otherwise return empty
          resolve(assignmentId ? fakeSubmissions : []);
        }, 500);
      });
    },
    initialData: [],
    enabled: !!assignmentId,
  });

  return {
    submissions,
    isLoading,
  };
};