import { Album, Book, BookA, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export const INSTRUCTOR_SIDEBAR_ITEMS: {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    icon: Book,
    url: "/instructor/courses",
    title: "My Courses",
  },
  {
    icon: BookA,
    url: "/instructor/assignments",
    title: "Assignments",
  },
  {
    icon: Album,
    url: "/instructor/announcements",
    title: "Announcements",
  },
] as const;
