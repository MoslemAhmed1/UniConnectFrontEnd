import { useAuth } from "@/providers/context/authContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spinner } from "../ui/spinner";
import type { serverRolesType } from "@/types/api/auth";

type AuthGuardProps = {
  allowedRoles?: serverRolesType[];
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

  // TODO: update this to have an unauthorized page
  // if authenticated
  // authorized -> go to route
  // not authorized go to unauthorized page
  // if not authenticated
  // go to login
  if (!auth.user)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return !allowedRoles || allowedRoles.includes(auth.user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};
