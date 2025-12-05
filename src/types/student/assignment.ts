import type { File } from "@/types/student/file";

type Assignment = {
  id: number;
  title: string;
  description: string;
  courseCode: string;
  uploaded_at: number;
  deadline_at: number;
  uploader: string;
  attached_files?: File[];
};

export { type Assignment };

