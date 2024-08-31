import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TRole = "user" | "admin";

type TProtectedProps = {
  children: ReactNode;
  roles: TRole[];
};

const ProtectedRoute = ({ children, roles }: TProtectedProps) => {
  const user = useAppSelector(currentUser);

  const { pathname } = useLocation();

  if (!user || !user.role || !roles.includes(user.role as TRole)) {
    return <Navigate to="/login" state={pathname} />;
  }
  return children;
};

export default ProtectedRoute;
