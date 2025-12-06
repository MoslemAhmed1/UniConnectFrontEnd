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
import AddEventForm from "@/components/forms/CourseForms/AddEventForm";

type AddEventModalProps = {
  courseCode: string;
  onSuccess?: (event: any) => void;
  trigger?: React.ReactNode;
};

export default function AddEventModal({
  courseCode,
  onSuccess,
  trigger,
}: AddEventModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          <>{trigger}</>
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Add an important event to your course calendar.
          </DialogDescription>
        </DialogHeader>
        <AddEventForm
          courseCode={courseCode}
          onClose={() => setOpen(false)}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
