import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { FileText, Trash2 } from "lucide-react";
import { UploadDropZone } from "@/components/global/UploadDropZone";
import { toast } from "sonner";

import { useSubmissionForm } from "@/hooks/student/use-submission-form";
import type { Submission } from "@/types/student/submission";

type SubmissionFormProps = {
  assignmentId: string;
  submission?: Submission | null;
};

export default function StudentSubmissionForm({
  assignmentId,
  submission,
}: SubmissionFormProps) {

  const mode = (submission && submission.status === "unsubmitted") ? "edit" : "create";
  const {
    control,
    isSubmitting,
    onSubmit,
    chooseFiles,
    chosenFiles,
    isValid,
    handleRemoveChosenFile,
    isDeletingFile,
  } = useSubmissionForm({
    mode,
    assignmentId,
    submissionId: submission?.id,
    submissionData: submission ?? undefined,
  });

  return (
    <form className="space-y-6" onSubmit={onSubmit} aria-busy={isSubmitting}>
      <FieldGroup>

        {/* Upload field + validation */}
        <Controller
          name="file_ids"
          control={control}
          render={({ fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <UploadDropZone
                endpoint="materialUploader"
                // appearance={{ button: { display: "none" } }}
                onClientUploadComplete={(files) => {
                  if (!files?.length) {
                    toast.error("No files returned from upload.");
                    return;
                  }

                  const uploadedFiles = files
                    .map((f) => f.serverData?.file_data)
                    .filter(Boolean)
                    .map((fd: any) => ({
                      id: String(fd.id),
                      key: fd.key,
                      name: fd.name,
                      size: fd.size,
                    }));

                  chooseFiles(uploadedFiles);
                }}
                onUploadError={() => {
                  toast.error("An error has occurred while uploading the file.");
                }}
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      
        {/* Selected files */}
        <div className="space-y-2">
          {(chosenFiles ?? []).map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{file.name}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveChosenFile(file.id)}
                disabled={isDeletingFile}
              >
                {!isDeletingFile ? <Trash2 /> : <Spinner />}
              </Button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              {mode === "edit" ? "Updating..." : "Submitting..."}
              <Spinner />
            </>
          ) : (
            <>{mode === "edit" ? "Update Submission" : "Submit"}</>
          )}
        </Button>

      </FieldGroup>
    </form>
  );
}