import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldSeparator,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import type { User } from "@/types/user/user";

import ConfirmPasswordField from "../reusable-fields/ConfirmPasswordField";
import EmailField from "../reusable-fields/EmailField";
import FirstNameField from "../reusable-fields/FirstNameField";
import ParentNameField from "../reusable-fields/ParentNameField";
import PasswordField from "../reusable-fields/PasswordField";
import RoleField from "../SignupForm/RoleField";
import StudentCodeField from "../SignupForm/StudentCodeField";
import StudentYearField from "../SignupForm/StudentYearField";

import useEditUser from "@/hooks/admin/use-edit-user";

type EditUserFormProps = {
  user: User;
  onClose: () => void;
};

export default function EditUserForm({ user, onClose }: EditUserFormProps) {
  const { control, trigger, onSubmit, isSubmitting, isValid, selectedRole } = useEditUser({ 
    user,
    onSuccess: onClose,
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <FieldGroup>
        <FirstNameField control={control} />
        <ParentNameField control={control} />

        <EmailField control={control} />

        {/* Admin can optionally change password */}
        <PasswordField control={control} />
        <ConfirmPasswordField control={control} />

        <RoleField control={control} trigger={trigger} />

        {selectedRole === "student" && (
          <>
            <FieldSeparator />

            <FieldSet>
              <FieldLegend>College Details</FieldLegend>
              <FieldDescription>
                Academic information related to the student account.
              </FieldDescription>

              <StudentCodeField control={control} />
              <StudentYearField control={control} trigger={trigger} />
            </FieldSet>
          </>
        )}

        <FieldSeparator />

        {/* Action Buttons */}
        <Field>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Saving Changes..." : "Update User"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}