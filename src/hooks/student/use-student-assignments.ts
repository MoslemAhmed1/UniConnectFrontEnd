import type { Assignment } from "@/types/student/assignment";
import { useQuery } from "@tanstack/react-query";

export const useStudentAssignments = () => {
  const { data: assignments, isLoading } = useQuery<Assignment[]>({
    queryKey: ["student-assignments"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeAssignments: Assignment[] = [
            {
              id: 1,
              title: "Linked Lists Implementation",
              description:
                "Implement a singly linked list with insertion, deletion, and traversal operations.",
              courseCode: "EEC-225",
              deadline_at: Date.now() + 3 * 24 * 60 * 60 * 1000,
              uploaded_at: Date.now() - 20 * 24 * 60 * 60 * 1000,
              uploader: "Dr. Ahmed Hassan",
              attached_files: [
                {
                  id: 1,
                  name: "LinkedList_StarterCode.zip",
                  type: "zip",
                  size: "120 KB",
                  url: "/files/linkedlist_starter.zip",
                  uploaded_at: Date.now() - 20 * 24 * 60 * 60 * 1000,
                },
                {
                  id: 2,
                  name: "LinkedList_Example.pdf",
                  type: "pdf",
                  size: "300 KB",
                  url: "/files/linkedlist_example.pdf",
                  uploaded_at: Date.now() - 2 * 24 * 60 * 60 * 1000,
                },
              ],
            },
            {
              id: 2,
              title: "Digital Logic — K-Map Minimization",
              description:
                "Solve the provided Karnaugh maps and simplify the Boolean expressions.",
              courseCode: "EEC-225",
              deadline_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
              uploaded_at: Date.now() - 1 * 24 * 60 * 60 * 1000,
              uploader: "Eng. Mona Ibrahim",
              attached_files: [
                {
                  id: 3,
                  name: "KMap_Problems.pdf",
                  type: "pdf",
                  size: "450 KB",
                  url: "/files/kmap_problems.pdf",
                  uploaded_at: Date.now() - 1 * 24 * 60 * 60 * 1000,
                },
              ],
            },
            {
              id: 3,
              title: "Operating Systems Report",
              description:
                "Write a report explaining process synchronization and classical problems.",
              courseCode: "CSE305",
              deadline_at: Date.now() + 1 * 24 * 60 * 60 * 1000,
              uploaded_at: Date.now() - 5 * 24 * 60 * 60 * 1000,
              uploader: "Dr. Samer Khaled",
              attached_files: [
                {
                  id: 4,
                  name: "OS_SampleReport.docx",
                  type: "docx",
                  size: "220 KB",
                  url: "/files/os_sample_report.docx",
                  uploaded_at: Date.now() - 5 * 24 * 60 * 60 * 1000,
                },
              ],
            },
            {
              id: 4,
              title: "Database ERD Assignment",
              description:
                "Create an ERD for the university registration system and normalize it.",
              courseCode: "CSE220",
              deadline_at: Date.now() + 10 * 24 * 60 * 60 * 1000,
              uploaded_at: Date.now() - 3 * 24 * 60 * 60 * 1000,
              uploader: "Dr. Mariam Saad",
              // No attached files for testing purposes
            },
          ];

          resolve(fakeAssignments);
        }, 1000);
      });
    },
    initialData: [],
  });

  return {
    assignments,
    isLoading,
  };
};