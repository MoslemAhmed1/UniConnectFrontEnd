import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InferedFormSchema } from "@/validations/SignupFormSchama";
import { Controller, type Control } from "react-hook-form";

const ParentNameField = ({
  control,
}: {
  control: Control<InferedFormSchema>;
}) => {
  return (
    <Controller
      name="parentName"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="second-name">Second Name</FieldLabel>
          <Input
            {...field}
            id="second-name"
            aria-invalid={fieldState.invalid}
            placeholder="Mohammed"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ParentNameField;
