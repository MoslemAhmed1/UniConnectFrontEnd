import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InferedFormSchema } from "@/validations/SignupFormSchama";
import { Controller, type Control } from "react-hook-form";

const ConfirmPasswordField = ({
  control,
}: {
  control: Control<InferedFormSchema>;
}) => {
  return (
    <Controller
      name="confirmPassword"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            {...field}
            type="password"
            id="confirm-password"
            aria-invalid={fieldState.invalid}
          />
          <FieldDescription>Please re-enter your password.</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ConfirmPasswordField;
