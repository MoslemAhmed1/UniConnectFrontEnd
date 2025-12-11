import type { YEARS } from "@/constants/student/student";
import type { User } from "../user/user";

type Course = {
  code: string;
  name: string;
  image_url: string;
  year: (typeof YEARS)[number];
  teachers: User[];
  // class: string; // semester/year --> e.g "Fall 2024"

  // Additional attributes can be added here
  students_number: number;
  representative_id?: number;
};

export { type Course };
