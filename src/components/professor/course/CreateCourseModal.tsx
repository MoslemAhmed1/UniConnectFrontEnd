import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useCourseForm } from "@/hooks/professor/use-course-form";
import { CourseFieldGroup } from "./CourseFieldGroup";

export const CreateCourseModal = () => {
  const { control, isValid, onSubmit, reset, isPending } = useCourseForm();

  const handleOpenChange = (open: boolean) => {
    if (open) reset();
  };
  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new course</DialogTitle>
            <DialogDescription>
              Enter the course details below. Click "Create course" to finalize
              and add the course.
            </DialogDescription>
          </DialogHeader>
          <CourseFieldGroup control={control} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!isValid}>
              {isPending ? "Creating Course" : "Create Course"}
              {isPending && <Spinner />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
