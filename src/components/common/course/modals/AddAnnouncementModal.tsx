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
import AddAnnouncementForm from "@/components/forms/CourseForms/AddAnnouncementForm";

type AddAnnouncementModalProps = {
  courseCode: string;
  trigger?: React.ReactNode;
};

export default function AddAnnouncementModal({
  courseCode,
  trigger,
}: AddAnnouncementModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          <>{trigger}</>
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Announcement
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-144">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Share important announcements with your class.
          </DialogDescription>
        </DialogHeader>
        <AddAnnouncementForm
          courseCode={courseCode}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
