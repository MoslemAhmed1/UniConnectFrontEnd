import {
  Book,
  BookA,
  Calendar,
  Megaphone,
  Users,
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
    icon: Calendar,
    url: "/calendar",
    title: "Deadlines Calendar",
  },
  {
    icon: Book,
    url: "/courses",
    title: "My Courses",
  },
  {
    icon: Megaphone,
    url: "/announcements",
    title: "Announcements",
  },
  {
    icon: Users,
    url: "/groups",
    title: "Scientific Discussion Groups",
  },
  {
    icon: BookA,
    url: "/assignments",
    title: "Assignments",
  },
] as const;
