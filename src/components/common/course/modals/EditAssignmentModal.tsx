import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import AssignmentForm from "@/components/forms/CourseForms/AssignmentForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Assignment } from "@/types/student/assignment";

type EditAssignmentModalProps = {
  assignment: Assignment;
};

const toInputDate = (timestamp: number) =>
  new Date(timestamp).toISOString().slice(0, 10);

const toInputTime = (timestamp: number) =>
  new Date(timestamp).toISOString().slice(11, 16);

export default function EditAssignmentModal({ assignment }: EditAssignmentModalProps) {
  const [open, setOpen] = useState(false);

  const defaultValues = {
      title: assignment.title,
      description: assignment.description,
      dueDate: toInputDate(assignment.deadline_at),
      dueTime: toInputTime(assignment.deadline_at),
      attachedFiles: assignment.attached_files
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
          <DialogDescription>
            Create a new assignment for your course.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <AssignmentForm
            mode="create"
            courseCode={assignment.courseCode}
            defaultValues={defaultValues}
            onClose={() => setOpen(false)}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
