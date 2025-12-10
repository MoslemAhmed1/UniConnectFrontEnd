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
import { UploadButton } from "@/components/global/UploadButton";
import { toast } from "sonner";

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
  const { control, isSubmitting, onSubmit, chooseFile, isFileChosen, isValid } =
    useAddMaterialForm({
      courseCode,
      defaultValues: defaultValues,
    });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={onSubmit}
      aria-busy={isSubmitting}
    >
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

              <Select
                value={field.value ?? "lecture"}
                onValueChange={field.onChange}
              >
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

        <UploadButton
          endpoint="materialUploader"
          disabled={isFileChosen}
          onClientUploadComplete={(res) => {
            console.log(res);
            const [file] = res;

            if (!file.serverData.file_id) {
              toast.error("Server couldn't upload the file properly.");
              return;
            }

            chooseFile({
              file_id: file.serverData.file_id,
              file_key: file.key,
            });
          }}
          onUploadError={() => {
            toast.error("An error has occurred while uploading the file.");
          }}
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

            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Adding..." : "Add Material"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
