import api from "@/lib/axios";
import {
  type loginRequestBody,
  type loginFailResponse,
  type loginSuccessResponse,
} from "@/types/api/auth";
import {
  loginFormSchema,
  type InferedFormSchema,
} from "@/validations/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

const useLoginForm = () => {
  const form = useForm<InferedFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // The type is changed here so it enforces the api request body on the output of the form
  // an error will be displayed if they can't be matched togther
  async function onSubmit(data: loginRequestBody) {
    try {
      const res = await api.post<loginSuccessResponse>("/api/auth/login", data);
      console.log(res.data.accessToken);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && "message" in err.response.data) {
          const message = err.response.data as loginFailResponse;
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
    form,
    onSubmit,
  };
};

export default useLoginForm;
