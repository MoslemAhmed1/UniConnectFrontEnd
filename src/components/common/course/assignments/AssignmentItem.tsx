import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import type { Assignment } from "@/types/student/assignment";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";

type AssignmentItemProps = {
  assignment: Assignment & { status?: string };
  allowModifyAssignments: boolean;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Due":
      return "bg-blue-50 text-blue-600";
    case "Due today":
      return "bg-teal-50 text-teal-600";
    case "Overdue":
      return "bg-red-50 text-red-600";
    case "Submitted":
      return "bg-teal-50 text-teal-600";
    case "Graded":
      return "bg-slate-100 text-slate-500";
    default:
      return "bg-slate-100 text-slate-500";
  }
};

export default function AssignmentItem({
  assignment,
  allowModifyAssignments = false,
}: AssignmentItemProps) {
  console.log(assignment.created_at);
  const uploadedAt = new Date(assignment.created_at);
  const now = new Date();
  const diffInMs = now.getTime() - uploadedAt.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  let formattedDate: string;
  if (diffInDays < 7) {
    formattedDate = formatDistanceToNow(uploadedAt, { addSuffix: true });
  } else {
    formattedDate = format(uploadedAt, "MMM d, h:mma");
  }

  return (
    <CardContent className="p-4 hover:bg-slate-100/70 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="font-medium text-slate-800 hover:text-blue-600 transition-colors truncate">
              <Link
                to={
                  allowModifyAssignments
                    ? `/instructor/courses/${assignment.course_id}/assignment/${assignment.id}`
                    : `/student/courses/${assignment.course_id}/assignment/${assignment.id}`
                }
              >
                {assignment.title}
              </Link>
            </CardTitle>
            <p className="text-sm text-slate-500 mt-2 line-clamp-1">
              {assignment.description}
            </p>
            <CardDescription className="flex items-center gap-3 text-sm text-slate-500 mt-2 flex-wrap">
              {assignment.assigner && (
                <>
                  <span className="capitalize">
                    {`${assignment.assigner.first_name} ${assignment.assigner.parent_name}`}
                  </span>
                  <span>•</span>
                </>
              )}
              <span>
                Uploaded {assignment.created_at ? formattedDate : "-"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {assignment.deadline_at
                    ? format(
                        new Date(
                          Number(assignment.deadline_at) ||
                            assignment.deadline_at
                        ),
                        "MMM d, h:mma"
                      )
                    : "-"}
                </span>
              </span>
            </CardDescription>
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(assignment.status ?? "Due")}>
            {assignment.status ?? "Due"}
          </Badge>
          {allowModifyAssignments && (
            <>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
          <Link
            to={
              allowModifyAssignments
                ? `/instructor/courses/${assignment.course_id}/assignment/${assignment.id}`
                : `/student/courses/${assignment.course_id}/assignment/${assignment.id}`
            }
          >
            <Button variant="ghost" size="icon">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  );
}
