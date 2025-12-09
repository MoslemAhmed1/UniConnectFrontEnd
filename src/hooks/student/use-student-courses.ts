import type { Course } from "@/types/student/course";
import { useQuery } from "@tanstack/react-query";

export const useStudentCourses = () => {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["student-courses"],
    queryFn: () => {
      // Simulate a backend call until we get the backend ready
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeCourses: Course[] = [
            {
              code: "EEC-225",
              name: "Signals & Systems",
              image_url: "/public/signals_systems.jpeg",
              instructor: "Prof. Abdelghany",
              class: "Fall 2024",
              year: "3"
            },
            {
              code: "MTH-204",
              name: "Advanced Probability & Statistics",
              image_url: "/public/probability.jpeg",
              instructor: "Prof. Maha Amin",
              class: "Fall 2024",
              year: "3"
            },
            {
              code: "EEC-226",
              name: "Digital Electronics",
              image_url: "/public/digital_electronics.jpeg",
              instructor: "Prof. Amr Hafez",
              class: "Fall 2024",
              year: "3"
            },
            {
              code: "CMP-202",
              name: "Database Management Systems",
              image_url: "/public/dbms.jpeg",
              instructor: "Prof. Lydia Wahid",
              class: "Fall 2024",
              year: "3"
            },
            {
              code: "CMP-201",
              name: "Computer Architecture",
              image_url: "/public/computer_architecture.jpeg",
              instructor: "Prof. Moustafa Ghouneem",
              class: "Fall 2025",
              year: "3"
            },
            {
              code: "GEN-221",
              name: "Project Management",
              image_url: "/public/project_management.jpeg",
              instructor: "Prf. Emad Aziz",
              class: "Fall 2025",
              year: "3"
            },
          ];

          resolve(fakeCourses);
        }, 1000);
      });
    },
    initialData: [],
  });

  return {
    courses,
    isLoading,
  };
};
