import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation()
    const user = localStorage.getItem("firekitchen");
    if (!user) {
        if (pathname.includes("share")) {
            return <Navigate to="/demo/fire-kitchen/login" replace />;
        }
        return <Navigate to="/demo/fire-kitchen/register" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
