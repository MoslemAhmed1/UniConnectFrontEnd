import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  addMaterialSchema,
  type InferredAddMaterialFormSchema,
} from "@/validations/AddMaterialFormSchema";

import type { Material } from "@/types/student/material";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

type UseAddMaterialFormArgs = {
  courseCode: string;
  defaultValues?: Partial<InferredAddMaterialFormSchema>;
};

type UploadFile = {
  file_id: string;
  file_key: string;
};

export const useAddMaterialForm = ({
  courseCode,
  defaultValues,
}: UseAddMaterialFormArgs) => {
  const form = useForm<InferredAddMaterialFormSchema>({
    resolver: zodResolver(addMaterialSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      folder: defaultValues?.folder ?? "lecture",
      file_id: undefined,
    },
    mode: "onBlur",
  });

  // TODO: will use it to delete the file later on
  // const [fileKey, setFileKey] = useState<string | undefined>();

  const {
    register,
    control,
    formState: { isSubmitting, isValid, errors },
    reset,
    handleSubmit,
    setValue,
    watch,
    trigger,
  } = form;
  console.log(errors);
  const { mutate: createMaterial, isPending } = useMutation({
    mutationKey: ["create-material"],
    mutationFn: (data: InferredAddMaterialFormSchema) => {
      const newMaterial = {
        title: data.title,
        category: data.folder,
        courseCode,
        file_id: data.file_id,
      };

      return api.post<Material>("/api/materials", newMaterial);
    },
    onSuccess: () => {
      reset();
      toast.success("Material has been added successfully.");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.data && "message" in error.response.data) {
          const message = error.response.data.message;
          toast.error(message);
          return;
        }
      }
      toast.error(
        "An error occurred while adding this material. Please try again."
      );
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    createMaterial(values);
  });

  const chooseFile = (file: UploadFile) => {
    setValue("file_id", file.file_id);
    trigger("file_id");
  };

  return {
    register,
    control,
    isValid,
    isSubmitting: isPending || isSubmitting,
    onSubmit,
    chooseFile,
    isFileChosen: watch("file_id") !== undefined,
  };
};
