import {
  loginFormSchema,
  type InferedFormSchema,
} from "@/validations/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useLoginForm = () => {
  const form = useForm<InferedFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: InferedFormSchema) {
    console.log(data);
  }

  return {
    form,
    onSubmit,
  };
};

export default useLoginForm;
