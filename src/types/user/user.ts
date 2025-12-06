import type { YEARS } from "@/constants/student/student";
import type { ROLES } from "@/constants/user/role";

export type Role = (typeof ROLES)[number];

export type GlobalUser = {
  id: string;
  image_url?: string;
  first_name: string;
  parent_name: string;
  grandparent_name?: string;
  family_name?: string;
  code?: string;
  email: string;
  year?: (typeof YEARS)[number];
};
