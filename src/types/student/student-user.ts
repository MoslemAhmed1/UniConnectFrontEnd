import { YEARS } from "@/constants/student/student";

// TODO: Modify this when the ER is completed
type StudentUser = {
  profileUrl: string;
  studentCode: string;
  firstName: string;
  parentName: string;
  grandparentName: string;
  familyName: string;
  email: string;
  year: (typeof YEARS)[number];
};

export { type StudentUser };
