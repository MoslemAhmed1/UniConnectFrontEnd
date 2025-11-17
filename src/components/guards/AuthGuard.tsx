import { useAuth } from "@/providers/context/authContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spinner } from "../ui/spinner";
import type { userRoles } from "@/types/api/auth";

type AuthGuardProps = {
  allowedRoles: userRoles[];
};

export const AuthGuard = ({ allowedRoles }: AuthGuardProps) => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="w-dvw h-dvh flex justify-center items-center">
        <Spinner className="size-8" />
      </div>
    );

  return auth.user && allowedRoles.includes(auth.user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
