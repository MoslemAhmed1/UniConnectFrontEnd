import { YEARS } from "@/constants/student/student";

type StudentUser = {
  image_url?: string;
  code: string;
  first_name: string;
  parent_name: string;
  grandparent_name?: string;
  family_name?: string;
  email: string;
  year: (typeof YEARS)[number];
  id: string;
};

export { type StudentUser };
