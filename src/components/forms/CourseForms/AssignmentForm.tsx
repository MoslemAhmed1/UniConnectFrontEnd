import { Controller } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useAssignmentForm } from "@/hooks/student/use-assignment-form";
import type { InferredAssignmentFormSchema } from "@/validations/AssignmentFormSchema";
import { FileText, Trash2 } from "lucide-react";
// import type { File } from "@/types/student/file";

type AssignmentFormProps = {
  mode?: "create" | "edit";
  assignmentId?: number;
  courseCode: string;
  onClose: () => void;
  defaultValues?: Partial<InferredAssignmentFormSchema>;
};

export default function AddAssignmentForm({
  mode = "create",
  assignmentId,
  courseCode,
  onClose,
  defaultValues,
}: AssignmentFormProps) {

  const { control, isSubmitting, onSubmit } = useAssignmentForm({
    mode,
    assignmentId,
    courseCode,
    defaultValues,
  });

  const isEditMode = mode === "edit";

  // State for attached files
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} aria-busy={isSubmitting}>
      <FieldGroup>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="assignment-title">Title</FieldLabel>
              <Input
                {...field}
                id="assignment-title"
                placeholder="e.g., Midterm Project"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="assignment-description">Description</FieldLabel>
              <Textarea
                {...field}
                id="assignment-description"
                placeholder="Assignment requirements and instructions..."
                rows={4}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Due Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="dueDate"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="assignment-due-date">Due Date</FieldLabel>
                <Input
                  {...field}
                  id="assignment-due-date"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="dueTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="assignment-due-time">Due Time</FieldLabel>
                <Input
                  {...field}
                  id="assignment-due-time"
                  type="time"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Upload Attach Files */}
        {/* TODO: Fix the File type problem here */}
        <Controller
          name="attachedFiles"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="assignment-files">Attach Files</FieldLabel>
              <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  id="assignment-files"
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt,.zip,.png,.jpeg,.jpg"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      setAttachedFiles((prev) => {
                        const updated = [...prev, ...newFiles];
                        field.onChange(updated);
                        return updated;
                      });
                    }
                  }}
                  aria-invalid={fieldState.invalid}
                />
                <label htmlFor="assignment-files" className="cursor-pointer">
                  <span className="block text-sm font-medium text-foreground mb-2">Click to upload or drag and drop</span>
                  <span className="block text-xs text-muted-foreground">PDF, DOCX, TXT, ZIP, PNG, JPEG, JPG (max 10MB)</span>
                </label>
              </div>

              {/* List attached files */}
              {attachedFiles.length > 0 && (
                <div className="space-y-2 mb-4">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setAttachedFiles((prev) => {
                            const updated = prev.filter((_, i) => i !== index);
                            field.onChange(updated);
                            return updated;
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

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
                  {isEditMode ? "Updating..." : "Adding..."}
                  <Spinner />
                </>
              ) : (
                <>{isEditMode ? "Update Assignment" : "Add Assignment"}</>
              )}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}