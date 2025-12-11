import GroupsMenuItem from "@/components/layout/sidebar/GroupsMenuItem";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { INSTRUCTOR_SIDEBAR_ITEMS } from "@/constants/instructor/layout";
import { STUDENT_SIDEBAR_ITEMS } from "@/constants/student/layout";
import { useHasRole } from "@/hooks/use-has-role";

const PopulatedSidebarContent = () => {
  const { hasRole } = useHasRole();

  const getSidebarItems = () => {
    if (hasRole("student", "class_representative", "course_head"))
      return STUDENT_SIDEBAR_ITEMS;
    else if (hasRole("system_admin", "professor/ta"))
      return INSTRUCTOR_SIDEBAR_ITEMS;

    return [];
  };

  // TODO: Highlight the selected sidebar item to deliver a better UX
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {getSidebarItems().map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={`/student/${item.url}`}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {hasRole("class_representative", "course_head", "student") && (
              <GroupsMenuItem />
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default PopulatedSidebarContent;
