import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useClassMembers } from "@/hooks/student/use-class-members";

import { useState } from "react";
import { ClassMembersModal } from "@/components/student/members/class-members-modal";
import type { StudentUser } from "@/types/student/student-user";

export const ClassMembers = () => {
  const { classMembers, isLoading } = useClassMembers();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<StudentUser | undefined>();

  const handleModalOpen = (user: StudentUser) => {
    setOpen(true);
    setSelectedUser(user);
  };

  return (
    <div className="w-full h-full">
      {isLoading || !classMembers ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        classMembers.map((classMember) => (
          <Item key={classMember.id} variant="outline" className="m-3">
            <Avatar>
              <AvatarImage src={classMember.image_url} />
              <AvatarFallback>
                {classMember.first_name[0].toUpperCase()}
                {classMember.parent_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ItemContent>
              <ItemTitle>
                {classMember.first_name} {classMember.parent_name}
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleModalOpen(classMember)}
              >
                Assign Course Head
              </Button>
            </ItemActions>
          </Item>
        ))
      )}
      <ClassMembersModal open={open} setOpen={setOpen} user={selectedUser} />
    </div>
  );
};
