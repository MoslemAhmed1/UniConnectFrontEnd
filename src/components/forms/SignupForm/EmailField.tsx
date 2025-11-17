import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InferedFormSchema } from "@/validations/SignupFormSchama";
import { Controller, type Control } from "react-hook-form";

const EmailField = ({ control }: { control: Control<InferedFormSchema> }) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...field}
            id="email"
            aria-invalid={fieldState.invalid}
            placeholder="m@example.com"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default EmailField;
