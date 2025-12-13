import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SubmissionForm from "@/components/forms/CourseForms/SubmissionForm";
import { useDeleteSubmission } from "@/hooks/student/use-delete-submission";
import type { Submission } from "@/types/student/submission";
import type { Assignment } from "@/types/student/assignment";
import { FileText, Eye } from "lucide-react";
import { useUnsubmit } from "@/hooks/student/use-unsubmit";

type SubmissionCardProps = {
  assignment: Assignment;
  assignmentId: string;
  submission?: Submission | null;
};

const getStatus = (assignment: Assignment, submission?: Submission | null) => {
  const deadline = new Date(assignment.deadline_at).getTime();
  const now = Date.now();
  const isToday = new Date(deadline).toDateString() === new Date().toDateString();

  if (now > deadline && (!submission || submission.status === "unsubmitted")) return "Overdue";
  if(submission?.status === "graded") return "Graded";
  if(submission?.status === "submitted") return "Submitted";
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

export default function SubmissionCard({ assignment, assignmentId, submission }: SubmissionCardProps) {

  const { handleDeleteSubmission, isDeleting } = useDeleteSubmission(submission?.id);
  const { handleUnsubmit, isUnsubmitting } = useUnsubmit(submission?.id);

  const status = getStatus(assignment, submission);

  const deadline = new Date(assignment.deadline_at).getTime();
  const now = Date.now();
  const hideButtons = !submission || submission.grade !== undefined || now > deadline;
  const showSubmissionForm = (now < deadline) && (!submission || submission?.status !== "graded");

  return (
    <Card className="p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Your Work</h3>
          <Badge className={getStatusColor(submission?.status)}>
            {status} {submission?.status === "graded" && assignment.max_grade !== null && `: ${submission.grade} / ${assignment.max_grade}`}
            </Badge>
        </div>
      </div>

      {/* If not submitted, show SubmissionForm */}
      {showSubmissionForm ? (
        <SubmissionForm assignmentId={assignmentId} />
      ) : (
        <>
          {/* Show submitted files (student cannot delete while submitted) */}
          {submission?.attached_files && submission?.attached_files.length > 0 && (
            <div className="space-y-2 mb-4">
              {submission.attached_files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">
                      {file.name}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {!hideButtons && (
            <>
                {/* Unsubmit button */}
                <Button
                  variant= "outline"
                  onClick={() => handleUnsubmit(submission.id)}
                  disabled={isUnsubmitting}
                  className="w-full"
                >
                  Unsubmit
                </Button>

                {/* Delete Button */}
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSubmission(submission.id)}
                  disabled={isDeleting}
                  className="w-full"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </>
          )}
        </>
      )}
    </Card>
  );
}