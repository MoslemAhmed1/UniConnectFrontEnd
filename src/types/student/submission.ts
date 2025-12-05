import type { File } from "@/types/student/file";

type Submission = {
  id: number;
  submitted_at: number;
  grade?: number;
  attached_files: File[];
  uploader: string;
};

export { type Submission };

