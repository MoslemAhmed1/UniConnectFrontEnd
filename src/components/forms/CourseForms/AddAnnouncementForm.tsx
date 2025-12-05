import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useAddAnnouncementForm } from "@/hooks/student/use-add-announcement-form";
import type { InferredAddAnnouncementFormSchema } from "@/validations/AddAnnouncementFormSchema";

type AddAnnouncementFormProps = {
  courseCode: string;
  onClose: () => void;
  defaultValues?: Partial<InferredAddAnnouncementFormSchema>;
};

export default function AddAnnouncementForm({
  courseCode,
  onClose,
  defaultValues,
}: AddAnnouncementFormProps) {
  const { control, isSubmitting, onSubmit } = useAddAnnouncementForm({
    courseCode,
    defaultValues,
  });
  
  // TODO: Add Poll Option here
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FieldGroup>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="announcement-title">Title</FieldLabel>
              <Input
                {...field}
                id="announcement-title"
                placeholder="e.g., Exam Schedule Updated"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Content */}
        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="announcement-content">Content</FieldLabel>
              <Textarea
                {...field}
                id="announcement-content"
                placeholder="Announcement details..."
                rows={5}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Type */}
        <Controller
          name="type"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="announcement-type">Type</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="poll">Poll</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Action Buttons */}
        <Field>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Posting...
                  <Spinner />
                </>
              ) : (
                "Post Announcement"
              )}
            </Button>
          </div>
        </Field>

      </FieldGroup>
    </form>
  );
}