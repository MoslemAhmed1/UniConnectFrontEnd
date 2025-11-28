import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YEARS } from "@/constants/student/student";
import { Controller, type Control } from "react-hook-form";

type CourseFieldGroupProps = {
  control: Control<{
    code: string;
    name: string;
    year: string;
  }>;
};

export function CourseFieldGroup({ control }: CourseFieldGroupProps) {
  return (
    <FieldGroup className="mb-5">
      <FieldSet>
        {/* TODO: Make it controlled when we integrate with uploadthing */}
        <Field>
          <FieldLabel>Course Image: </FieldLabel>
          <Input
            type="file"
            onChange={(data) => console.log(data.target.value)}
          />
        </Field>
        <Controller
          control={control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="code">Course Code: </FieldLabel>
              <Input
                {...field}
                id="course_code"
                aria-invalid={fieldState.invalid}
                placeholder="CMPG102"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Course Name: </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Propability"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="year"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Course Year:</FieldLabel>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger id="year" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldSet>
    </FieldGroup>
  );
}
