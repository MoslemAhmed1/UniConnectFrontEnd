import {
  Book,
  BookA,
  Calendar,
  LayoutDashboard,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const STUDENT_SIDEBAR_ITEMS: {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    url: "dashboard",
  },
  {
    icon: Calendar,
    url: "calendar",
    title: "Deadlines Calendar",
  },
  {
    icon: Book,
    url: "courses",
    title: "My Courses",
  },
  {
    icon: BookA,
    url: "assignments",
    title: "Assignments",
  },
] as const;
