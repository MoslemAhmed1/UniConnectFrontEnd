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
import { Plus } from "lucide-react";
import AddAssignmentForm from "@/components/forms/CourseForms/AddAssignmentForm";
import { ScrollArea } from "@/components/ui/scroll-area";

type AddAssignmentModalProps = {
  courseCode: string;
  trigger?: React.ReactNode;
};

export default function AddAssignmentModal({
  courseCode,
  trigger
}: AddAssignmentModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          <>{trigger}</>
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Assignment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
          <DialogDescription>
            Create a new assignment for your course.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <AddAssignmentForm
            courseCode={courseCode}
            onClose={() => setOpen(false)}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
