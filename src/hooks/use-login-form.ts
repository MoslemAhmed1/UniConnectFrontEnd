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

const useLoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // TODO: Change calendar to the home page (dashboard)
  const from = location.state?.from?.pathname || "/calendar";

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
  } = form;

  // The type is changed here so it enforces the api request body on the output of the form
  // an error will be displayed if they can't be matched togther
  async function onSubmit(data: loginRequestBody) {
    try {
      const res = await api.post<loginResponse>("/api/auth/login", data);
      setAuth({ token: res.data.accessToken, user: res.data.user });
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          const message = err.response.data.message;
          // TODO: Handle errors properly with react-hook-form
          // TODO: each wrong status returns a json object that conatins a message

          console.log(message);
        }
        // Unexpected axios error
      }
      // Unexpected error in general
    }
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    isValid,
  };
};

export default useLoginForm;
