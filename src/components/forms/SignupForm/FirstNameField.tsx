import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InferedFormSchema } from "@/validations/SignupFormSchama";
import { Controller, type Control } from "react-hook-form";

const FirstNameField = ({
  control,
}: {
  control: Control<InferedFormSchema>;
}) => {
  return (
    <Controller
      name="firstName"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            {...field}
            id="first-name"
            aria-invalid={fieldState.invalid}
            placeholder="Ahmed"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FirstNameField;
