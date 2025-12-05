import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddMaterialForm from "@/components/forms/CourseForms/AddMaterialForm";

type AddMaterialModalProps = {
  courseCode: string;
  trigger?: React.ReactNode;
};

export default function AddMaterialModal({ courseCode, trigger }: AddMaterialModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Material</DialogTitle>
        </DialogHeader>

        <AddMaterialForm
          courseCode={courseCode}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}