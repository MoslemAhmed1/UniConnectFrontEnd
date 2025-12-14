import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAssignmentData } from "@/hooks/student/use-assignment-data";
import { useSubmissionData } from "@/hooks/student/use-submission-data";
import notFoundAnimation from "@/assets/lottie/Error 404.json";
import CustomLottie from "@/components/global/CustomLottie";
import { format } from "date-fns";
import SubmissionCard from "./SubmissionCard";

export default function AssignmentSubmission() {
  const { assignmentId } = useParams();

  const { assignment, isLoading: assignmentLoading } = useAssignmentData(assignmentId ?? null);

  const { submission } = useSubmissionData(assignmentId ?? "");

  if (assignmentLoading) {
    <></> // TODO: Loading Seleton / Lottie react loading
  }

  if (!assignmentId || !assignment) {
    return (
      <CustomLottie
        message="Oops, this assignment doesn't exist."
        animationData={notFoundAnimation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Assignment content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">{assignment.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{`${assignment.assigner?.first_name} ${(assignment.assigner?.parent_name ?? "")}`}</span>
                <span>•</span>
                <span>Posted {format(new Date(assignment.created_at), "MMM d, yyyy")}</span>
                <span>•</span>
                <span className="text-primary font-medium">Due {format(new Date(assignment.deadline_at), "yyyy-MM-dd")}</span>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground">Description</h3>
              <div
                className="prose prose-sm max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: assignment.description ?? "" }}
              />
            </Card>

            {/* Attached Files */}
            {assignment.attached_files && assignment.attached_files.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Attached Files</h3>
                <div className="space-y-3">
                  {assignment.attached_files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right column - Submission box */}
          <div className="space-y-6">
            <SubmissionCard
              assignment={assignment}
              assignmentId={assignmentId}
              submission={submission}
            />
          </div>
        </div>
      </div>
    </div>
  );
}