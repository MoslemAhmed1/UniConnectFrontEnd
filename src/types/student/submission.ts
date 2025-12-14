import type { File } from "@/types/student/file";
import type { User } from "../user/user";

type Submission = {
  id: string;
  assignment_id: string;
  submitted_at: string;
  grade?: number;
  feedback?: string;
  status: SubmissionStatus;
  attached_files: File[];
  submitter: User;
};

type SubmissionStatus = "submitted" | "graded" | "unsubmitted";

export { type Submission };

