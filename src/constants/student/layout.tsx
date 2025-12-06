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
    url: "/student/dashboard",
  },
  {
    icon: Calendar,
    url: "/student/calendar",
    title: "Deadlines Calendar",
  },
  {
    icon: Book,
    url: "/student/courses",
    title: "My Courses",
  },
  {
    icon: BookA,
    url: "/student/assignments",
    title: "Assignments",
  },
] as const;
