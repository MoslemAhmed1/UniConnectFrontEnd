import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import { useState } from "react";
import type { Submission } from "@/types/student/submission";
import GradeSubmissionForm from "@/components/forms/CourseForms/GradeSubmissionForm";
import useDeleteSubmissionGrade from "@/hooks/instructor/use-delete-submission-grade";
import { format } from "date-fns";

type SubmissionCardProps = {
  submission: Submission;
  assignmentId?: string;
  maxGrade?: number | null;
};

export default function SubmissionCard({ submission, assignmentId, maxGrade }: SubmissionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAssigningGrade, setIsAssigningGrade] = useState(false);
  const { handleDeleteSubmissionGrade, isDeleting } = useDeleteSubmissionGrade(assignmentId);

  return (
    <Card className="p-4">
      {/* Submitter Info */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={submission.submitter.image_url} />
          <AvatarFallback className="rounded-full capitalize">
            {`${submission.submitter.first_name?.[0] ?? "?"}${submission.submitter.parent_name?.[0] ?? ""}`}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h4 className="font-semibold text-foreground">
            {`${submission.submitter.first_name ?? ""} ${submission.submitter.parent_name ?? ""}`.trim()}
          </h4>
          <p className="text-sm text-muted-foreground">
            Submitted at {submission.submitted_at ? format(new Date(submission.submitted_at), "MMM d, yyyy h:mm a").replace("am", "AM").replace("pm", "PM") : "—"}
          </p>
        </div>
      </div>

      {/* Submission Attached Files */}
      <div className="space-y-2 mb-4">
        <p className="text-sm font-medium text-foreground">Files:</p>
        {submission.attached_files?.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm">{file.name}</span>
              <span className="text-xs text-muted-foreground">({file.size})</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" aria-label={`view-${file.name}`}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label={`download-${file.name}`}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {submission.status === "graded" ? (
        <div className="p-3 pt-0 bg-accent/5 rounded border border-accent/20 mb-3">
          <p className="text-sm font-medium text-foreground mb-1">Grade: {submission.grade}/{maxGrade}</p>
          <p className="text-sm text-muted-foreground mb-2">{submission.feedback}</p>

          {isEditing ? (
            <GradeSubmissionForm
              mode="edit"
              submissionId={submission.id}
              assignmentId={assignmentId}
              onClose={() => setIsEditing(false)}
              defaultValues={{ grade: String(submission.grade), feedback: submission.feedback ?? undefined }}
            />
          ) : (
            <>
              <Button variant="outline" className="w-full mt-4" onClick={() => setIsEditing(true)}>Edit Grade</Button>
              <Button variant="destructive" className="w-full mt-4" onClick={() => handleDeleteSubmissionGrade(submission.id)} disabled={isDeleting}>
                {isDeleting ? "Removing..." : "Remove Grade"}
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          {isAssigningGrade ? (
            <GradeSubmissionForm
              mode="create"
              submissionId={submission.id}
              assignmentId={assignmentId}
              onClose={() => setIsAssigningGrade(false)}
            />
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setIsAssigningGrade(true)}>
              Assign Grade
            </Button>
          )}
        </>
      )}
    </Card>
  );
}