import api from "@/lib/axios";
import { useAuth } from "@/providers/context/authContext";
import { type loginRequestBody, type loginResponse } from "@/types/api/auth";
import {
  loginFormSchema,
  type InferedFormSchema,
} from "@/validations/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const useLoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname;

  const form = useForm<InferedFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    control,
  } = form;

  // The type is changed here so it enforces the api request body on the output of the form
  // an error will be displayed if they can't be matched togther
  async function onSubmit(data: loginRequestBody) {
    try {
      const res = await api.post<loginResponse>("/api/auth/login", data);
      setAuth({ token: res.data.accessToken, user: res.data.user });
      if (!from) {
        // TODO: Based on the user transfer him to the approperiate link
        if (res.data.user.role == "student") from = "/student/dashboard";
        else from = "/";
      }
      navigate(from, { replace: true });
      setAuth({ token: res.data.accessToken, user: res.data.user });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          const message = err.response.data.message;
          toast.error(message);
          return;
        }
      }
      toast.error("Unexpected server error");
    }
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    isValid,
    control,
  };
};

export default useLoginForm;
