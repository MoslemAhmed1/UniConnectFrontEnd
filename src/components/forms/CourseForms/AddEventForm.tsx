import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useAddEventForm } from "@/hooks/student/use-add-event-form";

type AddEventFormProps = {
  courseCode: string;
  onClose: () => void;
  onSuccess?: (payload: any) => void;
  onError?: (err: unknown) => void;
  defaultValues?: Partial<{ title: string; description: string; date: string; time: string; location: string }>;
};

export default function AddEventForm({
  courseCode,
  onClose,
  onSuccess,
  onError,
  defaultValues,
}: AddEventFormProps) {
  const { form, control, isSubmitting, onSubmit } = useAddEventForm({
    courseCode,
    onSuccess: (event) => {
      onSuccess?.(event);
      onClose();
    },
    onError,
    defaultValues,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-title">Event Title</FieldLabel>
              <Input
                {...field}
                id="event-title"
                aria-invalid={fieldState.invalid}
                placeholder="e.g., Guest Lecture"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-description">Description</FieldLabel>
              <Textarea
                {...field}
                id="event-description"
                aria-invalid={fieldState.invalid}
                placeholder="Event details..."
                rows={3}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="event-date">Date</FieldLabel>
                <Input
                  {...field}
                  id="event-date"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="time"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="event-time">Time</FieldLabel>
                <Input
                  {...field}
                  id="event-time"
                  type="time"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-location">Location</FieldLabel>
              <Input
                {...field}
                id="event-location"
                aria-invalid={fieldState.invalid}
                placeholder="e.g., Room 204"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
              {isSubmitting ? "Creating..." : "Create Event"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
