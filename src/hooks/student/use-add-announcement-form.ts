import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { toast } from "sonner";

import {
  addAnnouncementSchema,
  type InferredAddAnnouncementFormSchema,
} from "@/validations/AddAnnouncementFormSchema";

import type { Announcement } from "@/types/student/announcement";

type UseAddAnnouncementFormArgs = {
  courseCode: string;
  defaultValues?: Partial<InferredAddAnnouncementFormSchema>;
};

export const useAddAnnouncementForm = ({ courseCode, defaultValues }: UseAddAnnouncementFormArgs) => {
  const form = useForm<InferredAddAnnouncementFormSchema>({
    resolver: zodResolver(addAnnouncementSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      type: defaultValues?.type ?? "announcement",
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
      const newAnnouncement = {
        title: values.title,
        content: values.content,
        courseCode,
        type: values.type,
      };

      await api.post<Announcement>("/api/announcements", newAnnouncement);

      toast.success("Announcement has been added successfully.");
      form.reset({
        title: "",
        content: "",
        type: "announcement",
      });
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred while adding this announcement. Please try again."
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
