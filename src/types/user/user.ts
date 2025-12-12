import type { ROLES } from "@/constants/user/role";
import type { serverRolesType } from "../api/auth";

export type Role = (typeof ROLES)[number];

export type User = {
  image_url?: string;
  first_name: string;
  parent_name: string;
  grandparent_name?: string;
  family_name?: string;
  email: string;
  id: string;
  role: serverRolesType;
};
