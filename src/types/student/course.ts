import type { YEARS } from "@/constants/student/student";

type Course = {
  code: string;
  name: string;
  image_url: string;
  year: (typeof YEARS)[number];
  instructor: string; // temporary till backend is implemented
  class: string; // semester/year --> e.g "Fall 2024"
  
  // Additional attributes can be added here
  students_number?: number;
  representative_id?: number;
};

export { type Course };
