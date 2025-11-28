import api from "@/lib/axios";
import type { Course } from "@/types/student/course";
import {
  CourseFormSchema,
  type ICourseFormSchema,
} from "@/validations/CourseFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCourseForm = (initialCourseData?: Course) => {
  const client = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm({
    //@ts-expect-error For some reason this causes a weird type error when the code: "" is included in default values
    resolver: zodResolver(CourseFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      code: "",
      year: "1",
    },
  });

  useEffect(() => {
    if (initialCourseData) {
      reset(initialCourseData);
    }
  }, [reset, initialCourseData]);

  const { mutate: createCourse, isPending } = useMutation({
    mutationKey: ["create-course"],
    mutationFn: (data: ICourseFormSchema) => {
      if (initialCourseData) {
        const updateData = {
          name: data.name,
          year: data.year,
        };

        return api.patch(`/api/courses/${initialCourseData.code}`, updateData);
      }

      return api.post("/api/courses", data);
    },
    onSuccess: () => {
      let message;
      if (initialCourseData) message = "Successfully updated the course";
      else message = "Successfully created the course";

      toast.success(message);

      if (!initialCourseData) {
        reset();
      } else {
        client.invalidateQueries({
          queryKey: ["get-course", initialCourseData.code],
        });
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          const message = err.response.data.message;
          return toast.error(message);
        }
      }

      toast.error("Unexpected error has occurred");
    },
  });

  const onSubmit = handleSubmit((data) => {
    createCourse(data);
  });

  return {
    onSubmit,
    isPending,
    control,
    isValid,
    reset,
  };
};
