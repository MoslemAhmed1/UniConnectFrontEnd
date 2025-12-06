import type { Announcement } from "@/types/student/announcement";
import { useQuery } from "@tanstack/react-query";

export const useStudentAnnouncements = () => {
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ["student-announcements"],
    queryFn: () => {
      // Simulate a backend call until we get the backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeAnnouncements: Announcement[] = [
            {
                id: 1,
                title: "Midterm Exam Schedule Released",
                content: "The midterm exam will be held on November 18, 2025 at 2:00 PM in Hall A. Please review chapters 1-6 and complete all practice problems.",
                courseCode: "EEC-225",
                uploader: "Dr. Sarah Johnson",
                created_at: Date.now() - 1 * 24 * 60 * 60 * 1000,
                type: "announcement",
            },
            {
                id: 2,
                title: "Lab Session Moved to Friday",
                content: "Due to the building maintenance, the lab session scheduled for Thursday has been moved to Friday at the same time.",
                courseCode: "EEC-225",
                uploader: "Dr. Sarah Johnson",
                created_at: Date.now() - 2 * 24 * 60 * 60 * 1000,
                type: "announcement",
            },
            {
                id: 3,
                title: "Project Submission Deadline Extended",
                content: "The project submission deadline has been extended to November 30, 2025 to allow more time for completion.",
                courseCode: "EEC-225",
                uploader: "Teaching Assistant",
                created_at: Date.now() - 3 * 24 * 60 * 60 * 1000,
                type: "announcement",
            },
            {
                id: 4,
                title: "I hate PMI",
                content: "Due to the building maintenance, the lab session scheduled for Thursday has been moved to Friday at the same time.",
                courseCode: "GEN-221",
                uploader: "Dr. Emad Aziz",
                created_at: Date.now() - 4 * 24 * 60 * 60 * 1000,
                type: "announcement",
            },
            ];

          resolve(fakeAnnouncements);
        }, 1000);
      });
    },
    initialData: [],
  });

  return {
    announcements,
    isLoading,
  };
};
