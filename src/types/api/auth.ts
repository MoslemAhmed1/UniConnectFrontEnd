import type { User } from "../user/user";
export type serverRolesType =
  | "student"
  | "professor/ta"
  | "system_admin"
  | "class_representative"
  | "course_head";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type AuthUser = PartialBy<User, "year" | "code"> & {
  role: serverRolesType;
};

export type loginRequestBody = {
  email: string;
  password: string;
};

export type loginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type refreshResponse = loginResponse;
