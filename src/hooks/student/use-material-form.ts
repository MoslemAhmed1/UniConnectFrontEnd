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

export const useMaterialForm = ({ mode, courseCode, materialId, defaultValues }: UseMaterialFormArgs) => {
  const queryClient = useQueryClient();

  const form = useForm<InferredMaterialFormSchema>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      folder: defaultValues?.folder ?? "lecture",
      file: defaultValues?.file ?? undefined,
    },
    mode: "onBlur",
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form;

  // TODO: handle attaching file
  const mutation = useMutation({
    mutationKey: ["material", mode, materialId],
    mutationFn: async (values: InferredMaterialFormSchema) => {
      const newMaterial = {
        title: values.title,
        category: values.folder,
        course_code: courseCode,
        file: values.file,
      };

      if (mode === "create") {
        return api.post("/api/materials", newMaterial);
      } else {
        if (!materialId) throw new Error("Material ID is required for edit.");
        return api.put(`/api/materials/${materialId}`, newMaterial);
      }
    },
    onSuccess: () => {
      toast.success(`Material has been ${mode === "create" ? "created" : "updated"} successfully.`);

      queryClient.invalidateQueries({ queryKey: ["materials", courseCode] });

      if (mode === "create") {
        reset({
          title: "",
          folder: "lecture",
          file: undefined,
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

  return {
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    onSubmit,
  };
};