import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { User } from "@/types/user/user";
import { SquareArrowOutUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

type MemberProps = {
  member: User;
  extraActions?: ReactNode;
  currentPageAbsoluteUrl: string;
};

const Member = ({
  member,
  extraActions,
  currentPageAbsoluteUrl,
}: MemberProps) => {
  return (
    <Item variant="outline" className="mb-3">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src={member.image_url} />
          <AvatarFallback className="uppercase">
            {member.first_name[0] + member.parent_name[0]}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{`${member.first_name} ${member.parent_name}`}</ItemTitle>
      </ItemContent>
      <ItemActions>
        {extraActions}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon-sm"
              variant="ghost"
              className="rounded-full"
              aria-label="View Profile"
              asChild
            >
              <Link
                to={`/profiles/${member.id}?back=${currentPageAbsoluteUrl}`}
              >
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Profile</TooltipContent>
        </Tooltip>
      </ItemActions>
    </Item>
  );
};

export default Member;
