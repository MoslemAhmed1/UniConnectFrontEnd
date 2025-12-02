import Logo from "@/components/global/Logo";
import PopulatedSidebarContent from "@/components/student/layout/sidebar/PopulatedSidebarContent";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const StudentSidebar = () => {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo showText={open} />
      </SidebarHeader>
      <PopulatedSidebarContent />
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};

export default StudentSidebar;
