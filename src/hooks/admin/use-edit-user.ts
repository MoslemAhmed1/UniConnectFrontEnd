import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { toast } from "sonner";

import { signupFormSchema, type InferredFormSchema } from "@/validations/SignupFormSchema";
import type { User } from "@/types/user/user";

type UseEditUserArgs = {
  user: User;
  onSuccess?: () => void;
};

export const useEditUser = ({ user, onSuccess }: UseEditUserArgs) => {
  const queryClient = useQueryClient();

  // react-hook-form form setup
  const form = useForm<InferredFormSchema>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: user.first_name ?? "",
      parentName: user.parent_name ?? "",
      email: user.email ?? "",
      role: (user.role as string) ?? ("" as any),
      year: user.year ?? undefined,
      studentCode: user.code ?? undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
    trigger,
    watch,
  } = form;

  const selectedRole = watch("role");

  const { mutateAsync: editUser } = useMutation({
    mutationKey: ["edit-user", user.id],
    mutationFn: async (values: InferredFormSchema) => {
      const editUser: Record<string, any> = {
        first_name: values.firstName,
        parent_name: values.parentName,
        email: values.email,
        role: values.role,
      };

      if (values.year) editUser.year = values.year;
      if (values.studentCode) editUser.code = values.studentCode;
      if (values.password) editUser.password = values.password;

      return api.put(`/api/users/${user.id}`, editUser);
    },
    onSuccess: () => {
      toast.success("User updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      onSuccess?.();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          toast.error(err.response.data.message);
          return;
        }
      }
      toast.error("An error occurred while updating the user. Please try again.");
    },
  });

  const onSubmit = handleSubmit((values) => editUser(values));

  return {
    form,
    onSubmit,
    trigger,
    control,
    isValid,
    selectedRole,
    isSubmitting,
  };
};

export default useEditUser;