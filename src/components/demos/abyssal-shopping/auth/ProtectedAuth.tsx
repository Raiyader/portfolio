import { Navigate } from "react-router-dom";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("abyssalshopping");
  if (user) {
    return <Navigate to="/demo/abyssal-shopping" replace />;
  }
  return <>{children}</>;
};

export default ProtectedAuth;
