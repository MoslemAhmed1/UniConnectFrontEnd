import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InferedFormSchema } from "@/validations/SignupFormSchama";
import { Controller, type Control } from "react-hook-form";

const PasswordField = ({
  control,
}: {
  control: Control<InferedFormSchema>;
}) => {
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            {...field}
            id="password"
            type="password"
            aria-invalid={fieldState.invalid}
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default PasswordField;
