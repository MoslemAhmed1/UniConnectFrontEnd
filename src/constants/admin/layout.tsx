import {
  BookAlert,
  LayoutDashboard,
  ShieldUser,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const ADMIN_SIDEBAR_ITEMS: {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    icon: LayoutDashboard,
    url: "/instructor/dashboard",
    title: "Dashboard",
  },
  {
    icon: BookAlert,
    url: "/admin/requests",
    title: "Pending Requests",
  },
  {
    icon: ShieldUser,
    url: "/admin/create-admin",
    title: "Create Admin",
  },
] as const;
