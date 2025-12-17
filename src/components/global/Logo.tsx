import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/context/authContext";
import type { serverRolesType } from "@/types/api/auth";
import { Link } from "react-router";

type LogoProps = {
  showText?: boolean;
  imageClassName?: string;
  asLink?: boolean;
};

const USER_ROLE_TO_URL: Record<serverRolesType, string> = {
  class_representative: "/student/dashboard",
  student: "/student/dashboard",
  course_head: "/student/dashboard",
  "professor/ta": "/instructor/calendar",
  system_admin: "/admin/dashboard",
};

const Logo = ({
  showText = true,
  imageClassName,
  asLink = false,
}: LogoProps) => {
  const Component = asLink ? Link : "div";

  const { auth } = useAuth();
  if (!auth.user?.role) return null;

  return (
    <Component
      className="flex flex-col items-center"
      to={USER_ROLE_TO_URL[auth.user.role]}
    >
      <img
        src="/uniconnect_logo.svg"
        alt="UniConnect Logo."
        className={cn("size-14", imageClassName)}
      />
      {showText && <span className="font-bold text-2xl">UniConnect</span>}
    </Component>
  );
};

export default Logo;
