import { Card } from "@/components/ui/card";
import { SUBMISSIONS_TABLE_COLUMNS } from "@/constants/instructor/submissions-table";
import { useAssignmentData } from "@/hooks/student/use-assignment-data";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import SubmissionsTable from "./SubmissionsTable";
// import GradeSubmissionModal from "../modals/GradeSubmissionModal";

const AssignmentSubmissionProfessor = () => {
  const { assignmentId, id } = useParams();

  const { assignment } = useAssignmentData(assignmentId, id);

  if (!assignment) {
    return <>{/* TODO: Lottie React 404 Page */}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {assignment.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{`${assignment.assigner?.first_name} ${assignment.assigner?.parent_name ?? ""}`}</span>
                <span>•</span>
                <span>
                  Posted{" "}
                  {format(new Date(assignment.created_at), "MMM d, yyyy")}
                </span>
                <span>•</span>
                <span className="text-primary font-medium">
                  Due {format(new Date(assignment.deadline_at), "yyyy-MM-dd")}
                </span>
              </div>
            </div>

            {/* View Submissions (DIALOG BELOW) */}
            {/* <GradeSubmissionModal
              submissions={submissions}
              assignment={assignment}
            /> */}
          </div>

          {/* Description */}
          <Card className="p-6">
            <div
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: assignment.description ?? "",
              }}
            />
          </Card>

          <SubmissionsTable
            columns={SUBMISSIONS_TABLE_COLUMNS}
            assignment={assignment}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionProfessor;
