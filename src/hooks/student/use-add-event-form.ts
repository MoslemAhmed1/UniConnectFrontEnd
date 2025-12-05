import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import { addEventSchema, type InferredAddEventFormSchema } from "@/validations/AddEventFormSchema";

type UseAddEventFormOptions = {
  courseCode: string;
  onSuccess?: (event: any) => void;
  onError?: (err: unknown) => void;
  defaultValues?: Partial<InferredAddEventFormSchema>;
};

export function useAddEventForm({
  courseCode,
  onSuccess,
  onError,
  defaultValues,
}: UseAddEventFormOptions) {
  const form = useForm<InferredAddEventFormSchema>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      date: defaultValues?.date ?? "",
      time: defaultValues?.time ?? "",
      location: defaultValues?.location ?? "",
    },
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit(
    async (values) => {
      try {
        const response = await axios.post(
          `/api/events`,
          {
            ...values,
            courseCode,
          }
        );

        onSuccess?.(response.data);
        form.reset();
      } catch (err) {
        console.error("Failed to create event:", err);
        onError?.(err);
      }
    },
    (errors) => {
      console.error("Form validation errors:", errors);
      onError?.(errors);
    }
  );

  return {
    form,
    control,
    isSubmitting,
    onSubmit,
  };
}
