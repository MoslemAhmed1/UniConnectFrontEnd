import type { YEARS } from "@/constants/student/student";

type Course = {
  code: string;
  name: string;
  image_url: string;
  year: (typeof YEARS)[number];
};

export { type Course };
