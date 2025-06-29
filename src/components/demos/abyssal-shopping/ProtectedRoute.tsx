import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()
  const user = localStorage.getItem("abyssalshopping");
  if (!user) {
    if (pathname.includes("my-products")) {
      return <Navigate to="/demo/abyssal-shopping/auth?mode=login" replace />;
    }
    return <Navigate to="/demo/abyssal-shopping/auth?mode=register" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
