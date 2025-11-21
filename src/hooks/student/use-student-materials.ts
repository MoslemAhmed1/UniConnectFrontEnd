import type { Material } from "@/types/student/material";
import { useQuery } from "@tanstack/react-query";

export const useStudentMaterials = () => {
  const { data: materials, isLoading } = useQuery<Material[]>({
    queryKey: ["student-materials"],
    queryFn: () => {
      // Simulate a backend call until we get the backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
            const fakeMaterials: Material[] = [
              // Lecture Slides
              {
                id: 1,
                title: "Lecture 10 - Fourier Transform.pdf",
                category: "lecture",
                type: "PDF",
                size: "2.4 MB",
                uploaded_at: "2 days ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 2,
                title: "Lecture 9 - Laplace Transform.pdf",
                category: "lecture",
                type: "PDF",
                size: "2.1 MB",
                uploaded_at: "3 days ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 3,
                title: "Lecture 8 - Z-Transform.pdf",
                category: "lecture",
                type: "PDF",
                size: "2.0 MB",
                uploaded_at: "1 week ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },

              // Problem Sheets
              {
                id: 4,
                title: "Problem Sheet 5 - Solutions.pdf",
                category: "sheet",
                type: "PDF",
                size: "1.7 MB",
                uploaded_at: "4 days ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 5,
                title: "Problem Sheet 5.pdf",
                category: "sheet",
                type: "PDF",
                size: "1.4 MB",
                uploaded_at: "4 days ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 6,
                title: "Problem Sheet 4 - Solutions.pdf",
                category: "sheet",
                type: "PDF",
                size: "1.8 MB",
                uploaded_at: "1 week ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },

              // Past Quizzes
              {
                id: 7,
                title: "Quiz 3 - Fall 2024.pdf",
                category: "quiz",
                type: "PDF",
                size: "0.9 MB",
                uploaded_at: "5 days ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 8,
                title: "Quiz 2 - Fall 2024.pdf",
                category: "quiz",
                type: "PDF",
                size: "0.8 MB",
                uploaded_at: "2 weeks ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 9,
                title: "Quiz 1 - Fall 2024.pdf",
                category: "quiz",
                type: "PDF",
                size: "0.7 MB",
                uploaded_at: "3 weeks ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },

              // Tutorials
              {
                id: 10,
                title: "Tutorial 8 - System Analysis.pdf",
                category: "tutorial",
                type: "PDF",
                size: "1.6 MB",
                uploaded_at: "1 week ago",
                uploader: "TA Mahmoud",
                uploader_id: 2,
                courseCode: "EEC-225",
              },
              {
                id: 11,
                title: "Tutorial 7 - Frequency Response.pdf",
                category: "tutorial",
                type: "PDF",
                size: "1.5 MB",
                uploaded_at: "2 weeks ago",
                uploader: "TA Mahmoud",
                uploader_id: 2,
                courseCode: "EEC-225",
              },
              {
                id: 12,
                title: "Tutorial 6 - Transfer Functions.pdf",
                category: "tutorial",
                type: "PDF",
                size: "1.4 MB",
                uploaded_at: "3 weeks ago",
                uploader: "TA Mahmoud",
                uploader_id: 2,
                courseCode: "EEC-225",
              },

              // Textbook
              {
                id: 13,
                title: "Signals and Systems - Oppenheim (Chapter 5-8).pdf",
                category: "textbook",
                type: "PDF",
                size: "12 MB",
                uploaded_at: "1 month ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 14,
                title: "Signals and Systems - Oppenheim (Chapter 1-4).pdf",
                category: "textbook",
                type: "PDF",
                size: "10 MB",
                uploaded_at: "1 month ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 15,
                title: "Signals and Systems - Solutions Manual.pdf",
                category: "textbook",
                type: "PDF",
                size: "8 MB",
                uploaded_at: "1 month ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },

              // Assignments
              {
                id: 16,
                title: "Assignment 4 - Signal Processing.pdf",
                category: "assignment",
                type: "PDF",
                size: "1.3 MB",
                uploaded_at: "6 days ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 17,
                title: "Assignment 3 - Fourier Analysis.pdf",
                category: "assignment",
                type: "PDF",
                size: "1.2 MB",
                uploaded_at: "2 weeks ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
              {
                id: 18,
                title: "Assignment 2 - Time Domain Analysis.pdf",
                category: "assignment",
                type: "PDF",
                size: "1.2 MB",
                uploaded_at: "3 weeks ago",
                uploader: "Dr. Abdelghany",
                uploader_id: 1,
                courseCode: "EEC-225",
              },
            ];

          resolve(fakeMaterials);
        }, 1000);
      });
    },
    initialData: [],
  });

  return {
    materials,
    isLoading,
  };
};
