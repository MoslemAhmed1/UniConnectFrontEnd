import { useAuth } from "@/providers/context/authContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spinner } from "../ui/spinner";

export const UnAuthGuard = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  // TODO: Change calendar to the home page (dashboard)
  const from = location.state?.from?.pathname || "/calendar";

  if (loading)
    return (
      <div className="w-dvw h-dvh flex justify-center items-center">
        <Spinner className="size-8" />
      </div>
    );

  return !auth.user ? <Outlet /> : <Navigate to={from} replace />;
};
