import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubmissionCard from "../assignments/SubmissionCard";
import type { Submission } from "@/types/student/submission";
import type { Assignment } from "@/types/student/assignment";

type GradeSubmissionModalProps = {
  submissions: Submission[];
  assignment?: Assignment;
};

export default function GradeSubmissionModal({ submissions, assignment }: GradeSubmissionModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          View Submissions ({submissions.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Student Submissions</DialogTitle>
          <DialogDescription>Review and grade student submissions for this assignment</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] p-3">
          <div className="space-y-4">
            {submissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} assignmentId={assignment?.id} maxGrade={assignment?.max_grade}/>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}