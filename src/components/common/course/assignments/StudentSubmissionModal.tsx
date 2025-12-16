import StudentFormSubmission from "@/components/forms/CourseForms/StudentSubmissionForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeleteSubmission } from "@/hooks/student/use-delete-submission";
import useToggleTurnedIn from "@/hooks/student/use-toggle-turned-in";
import type { Assignment } from "@/types/student/assignment";
import type { Submission } from "@/types/student/submission";
import { Eye, FileText } from "lucide-react";
import DeleteSubmissionFileButton from "./DeleteSubmissionFileButton";

type SubmissionCardProps = {
  assignment: Assignment;
  submission?: Submission | null;
};

const getStatus = (assignment: Assignment, submission?: Submission | null) => {
  const deadline = new Date(assignment.deadline_at).getTime();
  const now = Date.now();
  const isToday =
    new Date(deadline).toDateString() === new Date().toDateString();

  if (now > deadline && !submission?.is_turned_in) return "Overdue";
  if (typeof submission?.grade === "number") return "Graded";
  if (submission?.is_turned_in) return "Submitted";
  if (isToday) return "Due Today";
  return "Due";
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "due":
      return "bg-blue-50 text-blue-600";
    case "due today":
      return "bg-amber-50 text-amber-600";
    case "overdue":
      return "bg-red-50 text-red-600";
    case "submitted":
      return "bg-green-50 text-green-600";
    case "graded":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export default function SubmissionCard({
  assignment,
  submission,
}: SubmissionCardProps) {
  const { handleDeleteSubmission, isDeleting } = useDeleteSubmission({
    submissionId: submission?.id,
    assignmentId: assignment.id,
    courseId: assignment.course_id,
  });

  const status = getStatus(assignment, submission);

  const { isTogglingTurnedIn, toggleTurnedIn } = useToggleTurnedIn({
    submission,
    courseId: assignment.course_id,
  });

  return (
    <Card className="p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Your Work</h3>
          <Badge className={getStatusColor(getStatus(assignment, submission))}>
            {status}{" "}
            {typeof submission?.grade === "number" &&
              `: ${submission.grade} / ${assignment.max_grade}`}
          </Badge>
        </div>
      </div>

      {!submission?.is_turned_in && (
        <StudentFormSubmission
          submission={submission}
          assignmentId={assignment.id}
          courseId={assignment.course_id}
        />
      )}

      {submission?.attached_files && submission.attached_files.length > 0 && (
        <div className="space-y-2 mb-4">
          {submission.attached_files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{file.name}</span>
              </div>
              <div>
                <DeleteSubmissionFileButton
                  assignmentId={assignment.id}
                  courseId={assignment.course_id}
                  fileId={file.id}
                  submissionId={submission.id}
                />
                <Button variant="ghost" size="icon" asChild>
                  <a href={file.url} target="_blank">
                    <Eye className="size-4" aria-label="View file" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {submission && typeof submission.grade !== "number" && (
        <>
          <Button
            variant="outline"
            onClick={() => toggleTurnedIn()}
            disabled={isTogglingTurnedIn}
            className="w-full"
          >
            Turn {submission.is_turned_in ? "Out" : "In"}
          </Button>
          {!submission.is_turned_in && (
            <Button
              variant="destructive"
              onClick={() => handleDeleteSubmission(submission.id)}
              disabled={isDeleting}
              className="w-full"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
