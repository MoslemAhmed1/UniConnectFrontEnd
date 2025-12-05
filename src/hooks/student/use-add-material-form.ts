import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  addMaterialSchema,
  type InferredAddMaterialFormSchema,
} from "@/validations/AddMaterialFormSchema";

import type { Material } from "@/types/student/material";

type UseAddMaterialFormArgs = {
  courseCode: string;
  defaultValues?: Partial<InferredAddMaterialFormSchema>;
};

export const useAddMaterialForm = ({ courseCode, defaultValues }: UseAddMaterialFormArgs) => {
  const form = useForm<InferredAddMaterialFormSchema>({
    resolver: zodResolver(addMaterialSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      folder: defaultValues?.folder ?? "lecture",
      file: undefined,
    },
    mode: "onBlur",
  });

  const {
    register,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const newMaterial = {
        title: values.title,
        category: values.folder,
        type: values.folder,
        courseCode,
        file: values.file, // backend now handles uploading + restrictions
      };

      await api.post<Material>("/api/materials", newMaterial);

      toast.success("Material has been added successfully.");
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred while adding this material. Please try again."
      );
    }
  });

  return {
    register,
    control,
    isSubmitting,
    onSubmit,
  };
};
