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
import { useCourseData } from "@/hooks/professor/use-course-data";

export const UpdateCourseModal = ({ courseCode }: { courseCode: string }) => {
  const { courseData, isLoading, isError, error } = useCourseData(courseCode);
  const { control, isValid, onSubmit, isPending } = useCourseForm(courseData);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Update the course</DialogTitle>
            <DialogDescription>
              Update the course info below. Click "Update course" to update the
              course.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <Spinner className="size-8 text-gray-500" />
          ) : (
            courseData && <CourseFieldGroup control={control} />
          )}
          {isError && (
            <div className="">
              <p className="text-red-400">{error?.message}</p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!isValid}>
              {isPending ? "Updating Course" : "Update Course"}
              {isPending && <Spinner />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
