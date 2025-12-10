import type { File } from "@/types/student/file";
import type { GlobalUser } from "../user/user";

type Material = {
  id: number | string;
  title: string;
  category: MaterialCategory;
  uploaded_at: number;
  courseCode: string;
  uploader: GlobalUser;
  file: File;
};

type MaterialCategory =
  | "lecture"
  | "sheet"
  | "quiz"
  | "assignment"
  | "tutorial"
  | "textbook";

export { type Material, type MaterialCategory };
