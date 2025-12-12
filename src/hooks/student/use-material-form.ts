import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  materialFormSchema,
  type InferredMaterialFormSchema,
} from "@/validations/MaterialFormSchema";

type UseMaterialFormArgs = {
  mode: "create" | "edit";
  courseCode: string;
  materialId?: number;
  defaultValues?: Partial<InferredMaterialFormSchema>;
};

type UploadFile = {
  file_id: string;
  file_key: string;
};

export const useMaterialForm = ({
  mode,
  courseCode,
  materialId,
  defaultValues,
}: UseMaterialFormArgs) => {
  const queryClient = useQueryClient();

  // TODO: will use it to delete the file later on
  // const [fileKey, setFileKey] = useState<string | undefined>();

  const form = useForm<InferredMaterialFormSchema>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      folder: defaultValues?.folder ?? "lecture",
      file_id: defaultValues?.file_id ?? undefined,
    },
    mode: "onBlur",
  });

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
  } = form;

  // TODO: handle attaching file
  const mutation = useMutation({
    mutationKey: ["material", mode, materialId],
    mutationFn: async (values: InferredMaterialFormSchema) => {
      const newMaterial = {
        title: values.title,
        category: values.folder,
        course_code: courseCode,
        file_id: values.file_id,
      };

      if (mode === "create") {
        return api.post("/api/materials", newMaterial);
      } else {
        if (!materialId) throw new Error("Material ID is required for edit.");
        return api.put(`/api/materials/${materialId}`, newMaterial);
      }
    },
    onSuccess: () => {
      toast.success(
        `Material has been ${mode === "create" ? "created" : "updated"} successfully.`
      );

      queryClient.invalidateQueries({ queryKey: ["materials", courseCode] });

      if (mode === "create") {
        reset({
          title: "",
          folder: "lecture",
          file_id: undefined,
        });
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error(
        `An error occurred while ${mode === "create" ? "adding" : "updating"} this material. Please try again.`
      );
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  const chooseFile = (file: UploadFile) => {
    setValue("file_id", file.file_id);
    trigger("file_id");
  };

  return {
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    onSubmit,
    chooseFile,
    isFileChosen: watch("file_id") !== undefined,
    isValid,
  };
};
