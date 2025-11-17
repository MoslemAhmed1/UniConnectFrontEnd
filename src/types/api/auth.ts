export type userRoles =
  | "admin"
  | "student"
  | "class_representitive"
  | "course_head"
  | "professer";

export type AuthUser = {
  userId: string;
  role: userRoles;
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
