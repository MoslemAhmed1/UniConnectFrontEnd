import { YEARS } from "@/constants/student/student";

// TODO: Modify this when the ER is completed
type StudentUser = {
  profileUrl?: string;
  studentCode: string;
  first_name: string;
  parent_name: string;
  grandparent_name?: string;
  family_name?: string;
  email: string;
  year: (typeof YEARS)[number];
  id: string;
};

export { type StudentUser };
