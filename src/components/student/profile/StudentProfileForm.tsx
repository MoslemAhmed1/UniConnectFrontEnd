import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { StudentUser } from "@/types/student/student-user";
import { useStudentProfileForm } from "@/hooks/student/use-student-profile-form";

type StudentProfileFormProps = {
  studentData: StudentUser;
};

export const StudentProfileForm = ({
  studentData,
}: StudentProfileFormProps) => {
  const { register, onFormSubmit, errors } = useStudentProfileForm(studentData);
  return (
    <form className="w-full" onSubmit={onFormSubmit}>
      <FieldGroup>
        <FieldSet className="grid grid-cols-1 md:grid-cols-2">
          <FieldLegend>
            <span className="text-xl font-bold">Profile Details</span>
          </FieldLegend>
          <Field className="col-span-2">
            <FieldLabel>Student Code</FieldLabel>
            <Input
              placeholder="Update your first name"
              readOnly
              disabled
              value={studentData.studentCode}
            />
          </Field>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              placeholder="Update your first name"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <FieldError>{errors.firstName.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Parent's Name</FieldLabel>
            <Input
              placeholder="Update your parent's name"
              {...register("parentName")}
              aria-invalid={!!errors.parentName}
            />
            {errors.parentName && (
              <FieldError>{errors.parentName.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Grandparent's Name</FieldLabel>
            <Input
              placeholder="Update your grandparent's name"
              {...register("grandparentName")}
              aria-invalid={!!errors.grandparentName}
            />
            {errors.grandparentName && (
              <FieldError>{errors.grandparentName.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Family's Name</FieldLabel>
            <Input
              placeholder="Update your family name"
              {...register("familyName")}
              aria-invalid={!!errors.familyName}
            />
            {errors.familyName && (
              <FieldError>{errors.familyName.message}</FieldError>
            )}
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="Update your email address"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
        </FieldSet>
        <FieldSet>
          <Button className="w-full md:w-2/5 lg:w-1/5">Save Changes</Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
