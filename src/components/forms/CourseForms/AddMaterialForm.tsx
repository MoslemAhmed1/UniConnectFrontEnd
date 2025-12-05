import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAddMaterialForm } from "@/hooks/student/use-add-material-form";
import type { InferredAddMaterialFormSchema } from "@/validations/AddMaterialFormSchema";

type AddMaterialFormProps = {
  courseCode: string;
  onClose: () => void;
  defaultValues?: Partial<InferredAddMaterialFormSchema>;
};

export default function AddMaterialForm({
  courseCode,
  onClose,
  defaultValues,
}: AddMaterialFormProps) {

  const { control, isSubmitting, onSubmit } = useAddMaterialForm({
    courseCode,
    defaultValues: defaultValues
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} aria-busy={isSubmitting}>
      <FieldGroup>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="material-title">Title</FieldLabel>
              <Input
                {...field}
                id="material-title"
                placeholder="e.g., Lecture 11 - Laplace Transform"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Folder */}
        <Controller
          name="folder"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Folder</FieldLabel>

              <Select value={field.value ?? "lecture"} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture">Lecture Slides</SelectItem>
                  <SelectItem value="sheet">Problem Sheets</SelectItem>
                  <SelectItem value="quiz">Past Quizzes</SelectItem>
                  <SelectItem value="tutorial">Tutorials</SelectItem>
                  <SelectItem value="textbook">Textbook</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* File Upload */}
        <Controller
          name="file"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="material-file">Attach File</FieldLabel>
              <input
                id="material-file"
                type="file"
                accept=".pdf,.docx,.txt,.zip,.png,.jpeg,.jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
                aria-invalid={fieldState.invalid}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-600
                  hover:file:bg-blue-100"
              />
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
              {isSubmitting ? "Adding..." : "Add Material"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </Field>

      </FieldGroup>
    </form>
  );
}