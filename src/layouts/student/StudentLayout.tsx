import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import StudentSidebar from "./StudentSidebar";

const StudentLayout = () => {
  return (
    <div>
      <SidebarProvider defaultOpen className="flex items-start">
        <StudentSidebar />
        <SidebarInset>
          <NavBar />
          <main className="p-3">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default StudentLayout;
