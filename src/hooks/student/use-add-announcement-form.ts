import { useFieldArray, useForm } from "react-hook-form";
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

export const useAddAnnouncementForm = ({
  courseCode,
  defaultValues,
}: UseAddAnnouncementFormArgs) => {
  const form = useForm<InferredAddAnnouncementFormSchema>({
    resolver: zodResolver(addAnnouncementSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      type: defaultValues?.type ?? "announcement",
      pollItems: [{ value: "" }, { value: "" }],
    },
    mode: "onSubmit",
  });

  const {
    control,
    formState: { isSubmitting },
    watch,
    handleSubmit,
  } = form;

  const {
    fields: pollFields,
    append: appendPollField,
    remove: removePollField,
  } = useFieldArray({
    control,
    rules: {
      minLength: 2,
    },
    name: "pollItems",
  });

  const selectedType = watch("type");

  const onSubmit = handleSubmit(async (values) => {
    try {
      const newAnnouncement = {
        title: values.title,
        content: values.content,
        courseCode,
        type: values.type,
        pollItems:
          values.type === "poll" &&
          values.pollItems.map((pollItem) => pollItem.value),
      };

      await api.post<Announcement>(
        `/api/courses/${courseCode}/announcements`,
        newAnnouncement
      );

      toast.success("Announcement has been added successfully.");

      // TODO: Close the form instead and (refresh the page to fetch the new announcement or add it optimistically)
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
    control,
    isSubmitting,
    onSubmit,
    selectedType,
    pollFields,
    appendPollField,
    removePollField,
  };
};
